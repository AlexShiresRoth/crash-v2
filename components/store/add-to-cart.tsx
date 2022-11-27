"use client";
import React from "react";
import cn from "classnames";
import axios from "axios";
import { StoreItemType } from "../../types/shopify-store-types";
import { useAppDispatch } from "../../redux/redux-hooks";
import { setCheckout } from "../../redux/store.reducer";

type Props = {
  itemId: StoreItemType["variants"][0]["id"];
  isDisabled: boolean;
};

const AddToCart = ({ itemId, isDisabled }: Props) => {
  const dispatch = useAppDispatch();

  const handleNewCheckout = async (): Promise<{
    checkout: any;
    success: boolean;
  }> => {
    try {
      const request = await axios({
        method: "POST",
        url: "/api/store/create-checkout",
      });

      if (!request?.data?.success) throw new Error("Error creating checkout");

      const checkout = await request.data?.checkout;

      return { checkout, success: true };
    } catch (error) {
      return { checkout: null, success: false };
    }
  };

  const handleExistingCheckout = async (
    checkoutId: string
  ): Promise<{ checkout: any; success: boolean }> => {
    try {
      const itemsToAdd = [
        {
          variantId: itemId,
          quantity: 1,
        },
      ];

      const addToCartRequest = await axios({
        method: "POST",
        url: "/api/store/add-to-cart",
        data: {
          checkoutId,
          itemsToAdd,
        },
      });

      if (!addToCartRequest?.data?.success)
        throw new Error("Error adding to cart");

      return {
        checkout: addToCartRequest?.data?.checkout,
        success: true,
      };
    } catch (error) {
      console.error("Error adding to cart", error);
      return {
        checkout: null,
        success: false,
      };
    }
  };

  const handleAddToCart = async (): Promise<void> => {
    try {
      //cannot add item to checkout if no checkout exists
      const checkout = localStorage.getItem("checkout");

      if (!checkout) {
        //create a new checkout
        const newCheckout = await handleNewCheckout();

        if (!newCheckout?.checkout) throw new Error("Error creating checkout");

        const parseCheckout = JSON.parse(newCheckout.checkout);
        //only pass checkout id to handleExistingCheckout
        //returns a stringified checkout object
        const addToCart = await handleExistingCheckout(parseCheckout.id);
        //set the new checkout in redux store and local storage
        dispatch(setCheckout(JSON.parse(addToCart.checkout)));
      } else {
        const checkoutId = JSON.parse(checkout)?.id;

        //returns a stringified checkout object
        const addToCart = await handleExistingCheckout(checkoutId);

        //update the checkout in redux store and local storage
        dispatch(setCheckout(JSON.parse(addToCart.checkout)));
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  return (
    <div>
      <button
        className={cn(
          "bg-orange-500 text-white min-w-1/4 p-2 rounded transition-all hover:bg-orange-800",
          {
            "bg-orange-500/20": isDisabled,
            "bg-orange-500": !isDisabled,
          }
        )}
        onClick={isDisabled ? () => {} : () => handleAddToCart()}
        disabled={isDisabled}
      >
        {isDisabled ? "Select Option" : "Add To Cart"}
      </button>
    </div>
  );
};

export default AddToCart;
