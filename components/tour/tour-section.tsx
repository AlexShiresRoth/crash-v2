import React from "react";
import { TourSectionDataType } from "../../types/tour-components/tour-section-data";
import TourDates from "./tour-dates";

type Props = {
  data: TourSectionDataType;
};

const TourSection = ({ data }: Props) => {
  return (
    <div className="w-3/4 flex flex-col items-start">
      <div className="flex justify-between items-center w-full">
        <div className="bg-gradient-to-r from-orange-700 to-red-800 pb-2">
          <h2 className="uppercase text-white font-semibold text-4xl bg-black p-2">
            {data?.title}
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href={data?.requestButtonLink}
            className="text-white text-sm border-2 border-white rounded py-2 px-4"
            target={"_blank"}
            rel="noreferrer"
          >
            {data?.requestButtonText}
          </a>

          <a
            href={data?.followButtonLink}
            className="text-white text-sm border-2 border-white rounded py-2 px-4"
            target={"_blank"}
            rel="noreferrer"
          >
            {data?.followButtontext}
          </a>
        </div>
      </div>
      <div>{data?.publicApiKey && <TourDates url={data?.publicApiKey} />}</div>
    </div>
  );
};

export default TourSection;
