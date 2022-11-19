import React from "react";
import { StoreItemType } from "../../types/shopify-store-types";

type Props = {
  variants: StoreItemType["variants"];
};

const ModalItemVariantSelect = ({ variants }: Props) => {
  console.log("variants", variants);
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="text-slate-500 text-sm mb-2">Select Type</label>
      <select className="p-2 bg-transparent border-[1px] outline-slate-500 border-slate-500 rounded text-slate-500">
        <option>Please Choose a type</option>
        {variants?.map((variant) => (
          <option value={variant?.id} key={variant?.id}>
            {variant?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModalItemVariantSelect;
