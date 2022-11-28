"use client";
import React, { useState } from "react";
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

  const [loading, setLoading] = useState<boolean>(false);

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

      //show a loader when adding to cart
      setLoading(true);
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
        setLoading(false);
      } else {
        const checkoutId = JSON.parse(checkout)?.id;

        //returns a stringified checkout object
        const addToCart = await handleExistingCheckout(checkoutId);

        //update the checkout in redux store and local storage
        dispatch(setCheckout(JSON.parse(addToCart.checkout)));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading && (
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
      )}

      {loading && (
        <button
          className={cn(
            "bg-orange-500 text-white min-w-1/4 p-2 rounded transition-all hover:bg-orange-800 flex gap-2 items-center justify-between"
          )}
        >
          <svg
            version="1.1"
            id="svg-spinner"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 80 80"
            xmlSpace="preserve"
            className="animate-spin w-6 h-6"
          >
            <path
              id="spinner"
              fill="transparent"
              stroke="#eee"
              strokeWidth={4}
              d="M40,72C22.4,72,8,57.6,8,40C8,22.4, 
    22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1–0.9,2–2,2 s-2–0.9–2–2c0–
    15.4–12.6–28–28–28S12,24.6,12,40s12.6, 
    28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z"
            ></path>
          </svg>
          Adding...
        </button>
      )}
    </div>
  );
};

export default AddToCart;
