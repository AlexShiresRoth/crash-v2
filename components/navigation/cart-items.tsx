import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHECKOUT_TYPE } from "../../types/redux-types/checkout.types";
import CartItem from "./cart-item";

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
        className="absolute top-[10px] right-0 min-w-[350px] max-h-[500px] overflow-y-auto  bg-[#111000] shadow-lg rounded-lg flex flex-col gap-2 p-2"
      >
        {lineItems?.length > 0 &&
          lineItems?.map((item) => <CartItem cartItem={item} key={item?.id} />)}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItems;
