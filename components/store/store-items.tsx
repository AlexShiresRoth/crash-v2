import React, { useState } from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import StoreItem from "./store-item";
type Props = {
  items: StoreItemType[];
};

const StoreItems = ({ items }: Props) => {
  return (
    <div className="flex flex-wrap justify-between gap-4 w-full mt-6">
      {/* need to break apart item so a function doesn't pass from server to client component */}
      {items?.map((item) => (
        <StoreItem
          key={item?.id}
          title={item?.title}
          itemId={item?.id}
          images={item?.images?.map((image) => ({ src: image?.src }))}
          price={{
            amount: item?.price?.amount,
            currencyCode: item?.price?.currencyCode,
          }}
          variants={item?.variants?.map((variant) => ({
            id: variant?.id,
            title: variant?.title,
            price: {
              amount: variant?.price?.amount,
              currencyCode: variant?.price?.currencyCode,
            },
            image: {
              src: variant?.image?.src,
            },
            available: variant?.available,
            sku: variant?.sku,
          }))}
          description={item?.description}
        />
      ))}
    </div>
  );
};

export default StoreItems;
