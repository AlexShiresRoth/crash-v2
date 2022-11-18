import React from "react";
import { HeroData } from "../../types/hero-data-type";
import H1 from "../headings/h1";
import HeroImage from "../image/hero-image";

type Props = {
  heroSection: HeroData;
};

const HeroSection = ({ heroSection }: Props) => {
  return (
    <div className="mb-10 w-3/4">
      <div className="flex justify-between items-center my-2">
        <H1 text={heroSection?.heading}></H1>

        <a href={heroSection?.ctaUrl}>
          <button className="text-sm border-2 border-orange-500 text-orange-500 rounded p-2 hover:bg-orange-500 hover:text-white transition-all">
            {heroSection?.cta}
          </button>
        </a>
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
