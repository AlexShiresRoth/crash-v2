"use client";
import classNames from "classnames";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import H2 from "../headings/h2";
import ImageSlider from "../image-slider/image-slider";
import AddToCart from "./add-to-cart";
import ModalItemVariantSelect from "./modal-item-variant-select";
import { motion } from "framer-motion";

type Props = {
  itemId: string;
  images: StoreItemType["images"];
  title: StoreItemType["title"];
  price: StoreItemType["price"];
  variants: StoreItemType["variants"];
  toggleModal: (val: string | null) => void;
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

  const [selectedItem, selectItem] =
    useState<StoreItemType["variants"][0]["id"]>();

  return (
    <motion.div
      className="w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layoutId={itemId}
    >
      <motion.div
        className="bg-black/80 w-full h-full absolute top-0 left-0 z-0 overflow-y-auto"
        onClick={() => toggleModal(null)}
      ></motion.div>
      <motion.div className="relative z-50 w-3/4 flex items-center bg-[#111000] shadow-xl rounded p-12 border-[1px] border-slate-500/30 gap-10">
        <ImageSlider
          images={images
            ?.map((img) => ({ src: img?.src, altText: title }))
            .reverse()}
        />
        <motion.div className="flex flex-col items-start gap-4 grow">
          <motion.div className="flex justify-between items-end w-full ">
            <motion.p className="text-slate-300 font-semibold text-lg">
              Price: ${price?.amount}
            </motion.p>
            <motion.button
              className="text-slate-50 bg-orange-800 rounded min-w-1/4 px-4 py-1 transition-all hover:bg-orange-500"
              onClick={() => toggleModal(null)}
            >
              Close
            </motion.button>
          </motion.div>
          <motion.h2 className="text-slate-50 font-semibold text-2xl">
            {title}
          </motion.h2>
          <motion.p className="text-slate-300 text-xl">
            {description !== "" ? description : "No description provided"}
          </motion.p>

          <motion.div className="flex flex-col  gap-4 border-t-[1px] border-slate-500/30 w-full">
            <motion.div className="flex items-end gap-4 mt-2">
              <ModalItemVariantSelect
                variants={variants}
                onChange={selectItem}
              />

              <AddToCart
                itemId={selectedItem ?? ""}
                isDisabled={selectedItem ? false : true}
                toggleModal={toggleModal}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ItemModal;
