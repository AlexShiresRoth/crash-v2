import Link from "next/link";
import React from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import { BsArrowRightShort } from "react-icons/bs";
import H2 from "../headings/h2";
import StoreItem from "./store-item";
import StoreItems from "./store-items";

type Props = {
  items: StoreItemType[];
};

const StoreSection = ({ items }: Props) => {
  return (
    <div className="w-3/4 flex flex-col mb-10">
      <div className="flex justify-between items-center">
        <H2 text="Support Us!" />
        <Link
          href={"/"}
          className="text-slate-400/50 flex items-center border-b-[1px] border-slate-400/50 transition-all hover:text-slate-50 hover:border-slate-50"
        >
          View All <BsArrowRightShort size={24} />
        </Link>
      </div>
      <StoreItems>
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
      </StoreItems>
    </div>
  );
};

export default StoreSection;
