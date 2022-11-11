import React from "react";
import { HeroData } from "../../types/hero-data-type";
import HeroImage from "../image/hero-image";
import ImageWrapper from "../image/image-wrapper";

type Props = {
  heroSection: HeroData;
};

const HeroSection = ({ heroSection }: Props) => {
  console.log("heroSection", heroSection);
  return (
    <div className="my-10">
      <div className="flex justify-between">
        <h1 className="uppercase">{heroSection?.heading}</h1>
        <div>
          <a href={heroSection?.ctaUrl}>
            <button className="text-sm border-2 border-orange-500 text-orange-500 rounded p-2 hover:bg-orange-500 hover:text-white transition-all">
              {heroSection?.cta}
            </button>
          </a>
        </div>
      </div>
      <div className="relative w-full h-[400px] z-0">
        <HeroImage
          imageUrl={heroSection?.image?.url}
          altText={"Crash the calm"}
        />
      </div>
    </div>
  );
};

export default HeroSection;
