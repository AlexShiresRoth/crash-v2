import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type CHECKOUT_TYPE = {
  webUrl: string;
  id: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    id: string;
    quantity: number;
    title: string;
    variant: {
      id: string;
      title: string;
      image: {
        src: string;
        id: string;
      };
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }[];
} | null;

type STATE_TYPE = {
  checkout: CHECKOUT_TYPE;
};

const initialState: STATE_TYPE = {
  checkout: null,
};

const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<CHECKOUT_TYPE>) => {
      state.checkout = action.payload;

      //set new checkout in local storage
      localStorage.setItem("checkout", JSON.stringify(action.payload));
    },
  },
});

export const { setCheckout } = store.actions;

export const selectCheckoutState = (state: RootState) => state.store.checkout;

export default store.reducer;
