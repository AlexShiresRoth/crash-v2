"use client";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { selectCheckoutState, setCheckout } from "../../redux/store.reducer";
import { StoreItemType } from "../../types/shopify-store-types";
import LoadingSpinner from "../loader/loading-spinner";

type Props = {
  itemId: StoreItemType["id"];
};
const RemoveFromCart = ({ itemId }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const checkoutState = useAppSelector(selectCheckoutState);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = async (itemId: string) => {
    setLoading(true);
    try {
      const request = await axios({
        method: "POST",
        url: "/api/store/remove-from-cart",
        data: {
          checkoutId: checkoutState?.id,
          lineItemsToRemove: [itemId],
        },
      });

      if (!request?.data?.success) throw new Error("Error removing from cart");

      const checkout = await request.data?.checkout;

      dispatch(setCheckout(checkout));
      ////////////////////
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error removing from cart", error);
    }
  };

  return (
    <>
      {!loading ? (
        <button
          className="text-xs text-slate-50/50 hover:text-slate-50 transition-all rounded p-2"
          onClick={() => handleRemoveFromCart(itemId)}
        >
          <AiOutlineCloseCircle size={20} />
        </button>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default RemoveFromCart;
