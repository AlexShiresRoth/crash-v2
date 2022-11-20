import Image from "next/image";
import React, { useRef, useState } from "react";
import cn from "classnames";

type Props = {
  images: { src: string; altText: string }[];
  sliderWidth?: number;
  sliderHeight?: number;
};

const ImageSlider = ({
  images,
  sliderWidth = 300,
  sliderHeight = 300,
}: Props) => {
  //current slide index
  const [current, setCurrent] = useState<number>(0);

  const slideRef: React.RefObject<HTMLDivElement> = useRef(null);
  //scroll to slide index being clicked
  const handleClickSlide = (index: number): void => {
    if (slideRef.current !== null) {
      slideRef.current.scrollLeft = slideRef.current.clientWidth * index;
      setCurrent(index);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="inline-flex  overflow-hidden relative no-scrollbar scroll-smooth transition-all"
        style={{ minWidth: sliderWidth + "px", minHeight: sliderHeight + "px" }}
        ref={slideRef}
      >
        {images?.map((image) => (
          <div
            key={image?.src}
            className="flex relative min-w-full min-h-full rounded"
          >
            <Image
              src={image?.src}
              alt={image?.altText}
              fill={true}
              className="object-cover object-center rounded"
            />
          </div>
        ))}
      </div>
      {images?.length > 1 && (
        <div className="w-full mt-4 flex justify-center gap-4">
          {images?.map((_, index: number) => (
            <span
              key={index}
              onClick={() => handleClickSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all block hover:shadow-xl hover:bg-white hover:cursor-pointer hover:flex-[.06] transition-all",
                {
                  "bg-white flex-[.06]": index === current,
                  "bg-gray-500/50 flex-[.04]": index !== current,
                }
              )}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
