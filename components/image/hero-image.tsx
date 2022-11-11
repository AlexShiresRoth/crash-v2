'use client'
import Image, { ImageLoaderProps } from "next/image";
import React from "react";

type Props = {
  imageUrl: string;
  altText?: string;
};

const HeroImage = ({ imageUrl, altText }: Props) => {
  const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Image
      fill={true}
      loader={imageLoader}
      src={imageUrl ?? ""}
      alt={altText ?? "Missing alt text"}
      className="object-cover rounded"
    />
  );
};

export default HeroImage;
