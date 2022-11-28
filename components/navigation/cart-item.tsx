import Image, { ImageLoaderProps } from "next/image";
import React from "react";
import { CHECKOUT_TYPE } from "../../types/redux-types/checkout.types";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  cartItem: CHECKOUT_TYPE["lineItems"][number];
};

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

//@TODO: need to add a remove item from cart functionality
const CartItem = ({ cartItem }: Props) => {
  return (
    <div className="flex gap-4 items-start justify-between border-b-[1px] border-slate-500/20 p-2">
      <div className="relative min-w-[80px] min-h-[80px] rounded ">
        <Image
          src={cartItem?.variant?.image?.src}
          alt={cartItem?.title}
          loader={imageLoader}
          fill={true}
          className="object-cover rounded"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-slate-50 text-sm font-semibold max-w-md">
          {cartItem?.title}
        </p>
        <p className="text-orange-600 text-xs">
          ${cartItem?.variant?.price?.amount}
        </p>
        <p className="text-slate-50 text-xs">Quantity: {cartItem?.quantity} </p>
      </div>
      <div className="flex gap-2">
        <button className="text-xs text-slate-50/50 hover:text-slate-50 transition-all rounded p-2">
          <AiOutlineCloseCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
