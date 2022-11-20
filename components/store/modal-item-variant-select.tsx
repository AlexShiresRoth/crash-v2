"use client";
import React from "react";
import { StoreItemType } from "../../types/shopify-store-types";

type Props = {
  variants: StoreItemType["variants"];
  onChange: (variant: StoreItemType["variants"][0]['id']) => void;
};

//TODO create a checkout if there is none
//tODO store checkout in local storage

const ModalItemVariantSelect = ({ variants, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="text-slate-500 text-sm mb-2">
        Select Type
      </label>
      <select
        className="p-2 bg-transparent border-[1px] outline-slate-500 border-slate-500 rounded text-slate-500"
        onChange={(e) => onChange(e.target.value)}
      >
        <option>Please Choose a type</option>
        {variants?.map((variant) => (
          <option
            value={variant?.id}
            key={variant?.id}
          >
            {variant?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModalItemVariantSelect;
