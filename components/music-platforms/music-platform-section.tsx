import React from "react";
import { MusicSectionDataType } from "../../types/music-section-type";
import H2 from "../headings/h2";

type Props = {
  data: MusicSectionDataType;
};
const MusicPlatformSection = ({ data }: Props) => {
  return (
    <div className="w-3/4 flex flex-col">
      <div className="mb-10">
        <H2 text={data?.title} />
      </div>

      <div className="flex gap-6">
        {data?.platformEmbedsCollection?.items?.map((item) => (
          <div
            className="border-[1px] border-slate-500/60 rounded p-8"
            key={item?.sys?.id}
          >
            <iframe
              src={item?.iframeSource}
              frameBorder="0"
              allow="encrypted-media"
              className="w-full rounded h-[380px] min-w-[500px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlatformSection;
