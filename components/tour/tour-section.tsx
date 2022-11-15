import React from "react";
import { TourSectionDataType } from "../../types/tour-components/tour-section-data";
import TourDates from "./tour-dates";

type Props = {
  data: TourSectionDataType;
};

const TourSection = ({ data }: Props) => {
  return (
    <div className="w-3/4 flex flex-col items-start ">
      <div className="flex justify-between items-center w-full">
        <h2 className="uppercase text-white font-semibold text-4xl bg-black border-b-2 border-orange-500 pb-2">
          {data?.title}
        </h2>
        <div className="flex gap-4 items-center text-orange-500">
          <a
            href={data?.requestButtonLink}
            target={"_blank"}
            rel="noreferrer"
            className="border-orange-500 border-2 text-sm rounded p-2 hover:bg-orange-500 hover:text-white transition-all"
          >
            {data?.requestButtonText}
          </a>

          <a
            href={data?.followButtonLink}
            target={"_blank"}
            rel="noreferrer"
            className="border-orange-500 border-2 text-sm rounded p-2 hover:bg-orange-500 hover:text-white transition-all"
          >
            {data?.followButtontext}
          </a>
        </div>
      </div>
      <div className="w-full">
        {data?.publicApiKey && (
          <TourDates
            url={data?.publicApiKey}
            requestToPlayUrl={data?.requestButtonLink}
          />
        )}
      </div>
    </div>
  );
};

export default TourSection;
