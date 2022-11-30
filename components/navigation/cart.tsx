"use client";
import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartData from "./cart-data";
import { selectCheckoutState, setCheckout } from "../../redux/store.reducer";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import axios from "axios";
import CartItems from "./cart-items";

const Cart = () => {

  const checkoutState = useAppSelector(selectCheckoutState);

  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const retrieveCheckout = useCallback(async () => {
    try {
      const request = await axios({
        method: "POST",
        url: "/api/store/retrieve-checkout",
        headers: {
          "Content-Type": "application/json",
        },
        data: { checkoutId },
      });
      //set checkout state in redux store
      dispatch(setCheckout(await request?.data?.checkout));
    } catch (error) {
      console.error("error retrieving checkout", error);
    }
  }, [checkoutId, dispatch]);

  //check storage for existing checkout id
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.localStorage && window?.localStorage.getItem("checkout")) {
        const checkout = localStorage?.getItem("checkout") ?? "";
        setCheckoutId(JSON.parse(checkout)?.id);
      }
    }
  }, [checkoutState]);

  //retrieve checkout if checkout id exists
  useEffect(() => {
    //if checkoutId is not null, retrieve checkout from API
    if (checkoutId) retrieveCheckout();
  }, [checkoutId, retrieveCheckout]);

  useEffect(() => {
    //show cart on new addition to cart
    setIsHovering(true)
  },[checkoutState?.lineItems])

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex items-center hover:cursor-pointer p-2 hover:bg-slate-600 rounded transition-all hover:text-orange-500"
    >
      <button>
        <AiOutlineShoppingCart className="text-slate-50" size={20} />
      </button>
      {checkoutId && (
        <CartData itemsLength={checkoutState?.lineItems?.length ?? 0} />
      )}
      {checkoutId &&
        isHovering &&
        checkoutState &&
        checkoutState?.lineItems?.length > 0 && (
          <div className="relative flex flex-col ">
            <CartItems lineItems={checkoutState?.lineItems ?? []} />
          </div>
        )}
    </div>
  );
};

export default Cart;
