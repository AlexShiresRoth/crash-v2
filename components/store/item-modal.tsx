"use client";
import classNames from "classnames";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import H2 from "../headings/h2";
import ImageSlider from "../image-slider/image-slider";
import ModalItemVariantSelect from "./modal-item-variant-select";

type Props = {
  itemId: string;
  images: StoreItemType["images"];
  title: StoreItemType["title"];
  price: StoreItemType["price"];
  variants: StoreItemType["variants"];
  toggleModal: (val: boolean) => void;
  description: StoreItemType["description"];
};

const ItemModal = ({
  itemId,
  images,
  title,
  price,
  variants,
  toggleModal,
  description,
}: Props) => {
  return (
    <div className=" w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center">
      <div
        className="bg-black/80 w-full h-full absolute top-0 left-0 z-0 overflow-y-auto"
        onClick={() => toggleModal(false)}
      ></div>
      <div className="relative z-50 w-3/4 flex bg-[#111000] shadow-xl rounded p-12 border-[1px] border-slate-500/50 gap-10">
        <ImageSlider
          images={images
            ?.map((img) => ({ src: img?.src, altText: title }))
            .reverse()}
        />
        <div className="flex flex-col items-start gap-4">
          <H2 text={title} />
          <p className="text-slate-300 text-xl">{description}</p>

          <div className="flex flex-col  gap-4">
            <div className="bg-orange-700 rounded p-2">
              <p className="text-slate-300">Price: ${price?.amount}</p>
            </div>
            <div>
              <ModalItemVariantSelect variants={variants} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
