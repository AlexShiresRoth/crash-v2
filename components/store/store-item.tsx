"use client";
import Image from "next/image";
import React, { useState } from "react";
import { StoreItemType } from "../../types/shopify-store-types";
import ImageSlider from "../image-slider/image-slider";
import ItemModal from "./item-modal";
import { motion, AnimatePresence } from "framer-motion";
type Props = {
  itemId: string;
  images: StoreItemType["images"];
  title: StoreItemType["title"];
  price: StoreItemType["price"];
  variants: StoreItemType["variants"];
  description: StoreItemType["description"];
};

const StoreItem = ({
  itemId,
  title,
  images,
  price,
  variants,
  description,
}: Props) => {

  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <AnimatePresence>
        {selectedId && (
          <ItemModal
            toggleModal={setSelectedId}
            title={title}
            itemId={itemId}
            images={images?.map((image) => ({ src: image?.src }))}
            price={{
              amount: price?.amount,
              currencyCode: price?.currencyCode,
            }}
            variants={variants?.map((variant) => ({
              id: variant?.id,
              title: variant?.title,
              price: variant?.price,
              image: variant?.image,
              available: variant?.available,
              sku: variant?.sku,
            }))}
            description={description}
          />
        )}
      </AnimatePresence>
      <motion.div
        layoutId={itemId}
        onClick={() => setSelectedId(itemId)}
        className="flex flex-col w-1/4 border-[1px] border-slate-500/30 bg-slate-500/10 rounded p-8 grow gap-6"
      >
        <motion.div>
          <motion.p className="text-slate-50 font-semibold text-xl max-w-sm">
            {title}
          </motion.p>
        </motion.div>
        <motion.div className="relative w-full grow">
          <ImageSlider
            images={images
              ?.map((img) => ({ src: img?.src, altText: title }))
              .reverse()}
            sliderWidth={250}
            sliderHeight={250}
          />
        </motion.div>
        <motion.div className="flex justify-between flex-wrap-reverse items-center">
          <motion.div>
            <motion.p className="text-slate-50 p-2 text-lg font-semibold">
              {price?.currencyCode === "USD" ? "$" : ""}
              {price?.amount}
            </motion.p>
            <motion.div className="h-3 bg-gradient-to-r from-red-500 to-orange-500 -mt-5" />
          </motion.div>
          <motion.button
            onClick={() => setSelectedId(itemId)}
            className="bg-slate-500/50 min-w-1/4 rounded text-slate-50 px-4 py-2 hover:bg-slate-500 transition-all"
          >
            View
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default StoreItem;
