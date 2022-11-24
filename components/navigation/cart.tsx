"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartData from "./cart-data";

//@TODO: need to update cart state on a new add to cart without using redux
const Cart = () => {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  useMemo(() => {
    if (typeof window !== "undefined") {
      if (window?.localStorage && window?.localStorage.getItem("checkout")) {
        setCheckoutId(localStorage.getItem("checkout"));
      }
    }
  }, []);

  return (
    <div className="flex items-center">
      <button>
        <AiOutlineShoppingCart className="text-slate-50" size={20} />
      </button>
      {checkoutId && <CartData checkoutId={checkoutId} />}
    </div>
  );
};

export default Cart;
