import React from "react";
import { MusicSectionDataType } from "../../types/music-section-type";
import H2 from "../headings/h2";

type Props = {
  data: MusicSectionDataType;
};
const MusicPlatformSection = ({ data }: Props) => {
  return (
    <div className="w-3/4 flex flex-col mb-10">
      <div className="mb-4">
        <H2 text={data?.title} />
      </div>

      <div className="flex gap-6 flex-wrap">
        {data?.platformEmbedsCollection?.items?.map((item) => (
          <div
            className="border-[1px] border-slate-500/30 rounded p-4 grow"
            key={item?.sys?.id}
          >
            <div className=" mb-4 ">
              <h4 className="text-slate-50 text-xl border-b-[1px] border-slate-500/30 p-2 pb-[2px]">
                {item?.title}
              </h4>
            </div>
            <iframe
              src={item?.iframeSource}
              frameBorder="0"
              allow="encrypted-media"
              className="w-full rounded h-[380px] w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlatformSection;
