import React from "react";
import { useAppSelector } from "../../redux/redux-hooks";
import { selectCheckoutState } from "../../redux/store.reducer";

const CheckoutButton = () => {
  const checkoutState = useAppSelector(selectCheckoutState);

  return (
    <div className="flex w-full justify-center items-cente my-2">
      <div className="flex w-11/12 justify-between items-center">
        <p className="text-slate-100">Total: ${checkoutState?.totalPrice?.amount}</p>
        <a href={checkoutState?.webUrl}>
          <button className="px-4 py-2 bg-slate-500 text-slate-50 rounded hover:bg-slate-700 transition-all">
            Checkout
          </button>
        </a>
      </div>
    </div>
  );
};

export default CheckoutButton;
