import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHECKOUT_TYPE } from "../../types/redux-types/checkout.types";
import CartItem from "./cart-item";
import CheckoutButton from "./checkout-button";

type Props = {
  lineItems: CHECKOUT_TYPE["lineItems"] | [];
};

const CartItems = ({ lineItems }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-[10px] right-0 min-w-[350px]  overflow-x-hidden bg-[#111000] shadow-lg rounded-lg flex flex-col gap-2 p-2"
      >
        <motion.div className="max-h-[500px] flex flex-col overflow-y-auto">
          {lineItems?.length > 0 &&
            lineItems?.map((item) => (
              <CartItem cartItem={item} key={item?.id} />
            ))}
        </motion.div>
        <CheckoutButton />
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItems;
