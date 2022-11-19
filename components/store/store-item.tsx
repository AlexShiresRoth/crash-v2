"use client";
import Image from "next/image";
import React, { useState } from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import ItemModal from "./item-modal";

type Props = {
  itemId: string;
  images: StoreItemType["images"];
  title: StoreItemType["title"];
  price: StoreItemType["price"];
  variants: StoreItemType["variants"];
};

const StoreItem = ({ itemId, title, images, price, variants }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen && (
        <ItemModal
          toggleModal={setIsModalOpen}
          title={title}
          itemId={itemId}
          images={images?.map((image) => ({ src: image?.src }))}
          price={{
            amount: price?.amount,
            currencyCode: price?.currencyCode,
            type: price?.type,
          }}
          variants={variants?.map((variant) => ({
            id: variant?.id,
            title: variant?.title,
            price: variant?.price,
            image: variant?.image,
            available: variant?.available,
            sku: variant?.sku,
          }))}
        />
      )}
      <div className="flex flex-col w-1/4 border-[1px] border-slate-500/30 bg-slate-500/10 rounded p-8 grow gap-6">
        <div>
          <p className="text-slate-50 font-semibold text-xl max-w-sm">
            {title}
          </p>
        </div>
        <div className="relative w-full h-[250px] grow">
          {images?.map((image) => (
            <Image
              key={image?.src}
              src={image?.src}
              fill={true}
              alt={title}
              className="object-cover rounded"
            />
          ))}
        </div>
        <div className="flex justify-between flex-wrap-reverse items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-500/50 w-1/2 rounded text-slate-50 px-4 py-2 hover:bg-slate-500 transition-all"
          >
            View
          </button>
          <div>
            <p className="text-slate-50 p-2 text-lg font-semibold">
              {price?.currencyCode === "USD" ? "$" : ""}
              {price?.amount}
            </p>
            <div className="h-3 bg-gradient-to-r from-red-500 to-orange-500 -mt-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreItem;
