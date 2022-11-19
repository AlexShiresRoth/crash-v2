"use client";
import classNames from "classnames";
import Image from "next/image";
import React, { useState, useRef } from "react";
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
  const [current, setCurrent] = useState<number>(0);
  //TODO only toggle modal if clicking outside of modal

  const slideRef: React.RefObject<HTMLDivElement> = useRef(null);
  //scroll to slide index being clicked
  const handleClickSlide = (index: number): void => {
    if (slideRef.current !== null) {
      slideRef.current.scrollLeft = slideRef.current.clientWidth * index;
      setCurrent(index);
    }
  };
  return (
    <div className=" w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center">
      <div
        className="bg-black/80 w-full h-full absolute top-0 left-0 z-0"
        onClick={() => toggleModal(false)}
      ></div>
      <div className="relative z-50 w-3/4 flex bg-[#111000] shadow-xl rounded p-12 border-[1px] border-slate-500/50 gap-10">
        <div className="flex flex-col justify-center items-center">
          <div
            className="min-w-[400px] h-[400px] inline-flex overflow-hidden relative no-scrollbar scroll-smooth transition-all"
            ref={slideRef}
          >
            {images?.map((image) => (
              <div
                key={image?.src}
                className="flex relative min-w-full h-[400px] rounded"
              >
                <Image
                  src={image?.src}
                  alt={title}
                  fill={true}
                  className="object-cover object-center rounded"
                />
              </div>
            ))}
          </div>
          <div className="w-full mt-4 flex justify-center gap-4">
            {images?.map((img, index: number) => (
              <span
                key={index}
                onClick={() => handleClickSlide(index)}
                className={classNames(
                  "w-2 h-2 rounded-full transition-all block hover:shadow-xl hover:bg-white hover:cursor-pointer hover:flex-[.06] transition-all",
                  {
                    "bg-white flex-[.06]": index === current,
                    "bg-gray-500/50 flex-[.04]": index !== current,
                  }
                )}
              ></span>
            ))}
          </div>
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
