"use client";
import React from "react";
import cn from "classnames";
import axios from "axios";
import { StoreItemType } from "../../types/shopify-store-types";

type Props = {
  itemId: StoreItemType["variants"][0]["id"];
  isDisabled: boolean;
};

const AddToCart = ({ itemId, isDisabled }: Props) => {
  const handleNewCheckout = async (): Promise<{ checkoutId: string }> => {
    try {
      const request = await axios({
        method: "POST",
        url: "/api/store/create-checkout",
      });

      if (!request?.data?.success) throw new Error("Error creating checkout");

      //set new checkout in local storage
      localStorage.setItem("checkout", await request?.data?.checkout);

      return { checkoutId: request?.data?.checkout };
    } catch (error) {
      return { checkoutId: "" };
    }
  };

  const handleExistingCheckout = async (
    checkoutId: string
  ): Promise<{ newCheckout: any; success: boolean }> => {
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
        newCheckout: addToCartRequest?.data?.checkout,
        success: true,
      };
    } catch (error) {
      console.error("Error adding to cart", error);
      return {
        newCheckout: null,
        success: false,
      };
    }
  };

  const handleAddToCart = async (): Promise<void> => {
    try {
      //cannot add item to checkout if no checkout exists
      const checkoutId = localStorage.getItem("checkout");

      if (!checkoutId) {
        //create a new checkout
        const newCheckoutId = await handleNewCheckout();

        if (!newCheckoutId?.checkoutId)
          throw new Error("Error creating checkout");

        const addToCart = await handleExistingCheckout(
          newCheckoutId?.checkoutId
        );
      } else {
        const addToCart = await handleExistingCheckout(checkoutId);
      }
    } catch (error) {
      console.error("Error", error);
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
