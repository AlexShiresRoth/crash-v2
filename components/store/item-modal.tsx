"use client";
import Image from "next/image";
import React from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import H2 from "../headings/h2";

type Props = {
  itemId: string;
  images: StoreItemType["images"];
  title: StoreItemType["title"];
  price: StoreItemType["price"];
  variants: StoreItemType["variants"];
  toggleModal: (val: boolean) => void;
};

const ItemModal = ({
  itemId,
  images,
  title,
  price,
  variants,
  toggleModal,
}: Props) => {
  //TODO only toggle modal if clicking outside of modal
  return (
    <div
      className="bg-slate-900/40 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center"
      onClick={() => toggleModal(false)}
    >
      <div className="w-3/4 flex bg-black shadow-xl rounded p-12 border-[1px] border-slate-500/50 gap-10">
        <div className="w-[400px] h-[400px] inline-flex overflow-y-hidden overflow-x-scroll relative">
          {images?.map((image) => (
            <div
              key={image?.src}
              className="flex relative w-full h-[300px]"
            >
              <Image
                src={image?.src}
                alt={title}
                fill={true}
                className="object-contain object-center"
              />
            </div>
          ))}
        </div>
        <div>
          <H2 text={title} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ItemModal;
