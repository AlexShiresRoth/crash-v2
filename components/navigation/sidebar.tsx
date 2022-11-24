import React from "react";
import { PageItem } from "../../types/page-item";
import {
  SlSocialTwitter,
  SlSocialFacebook,
  SlSocialSpotify,
  SlSocialYoutube,
  SlSocialSoundcloud,
} from "react-icons/sl";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
type Props = {
  socialIcons: PageItem["socialLinksCollection"]["items"];
};

const SideBar = ({ socialIcons }: Props) => {
  return (
    <div className="min-h-screen  border-l-[1px] border-slate-500/50 ">
      <div className="p-4 py-16 sticky top-0">
        <div className="flex flex-col gap-4">
          {socialIcons?.map((item) => {
            return (
              <div key={item?.sys?.id} className="text-slate-50">
                <a href={item?.url} className="text-lg hover:text-orange-500 transition-all">
                  {item?.icon === "twitter" && <SlSocialTwitter size={20} />}
                  {item?.icon === "instagram" && (
                    <AiOutlineInstagram size={20} />
                  )}
                  {item?.icon === "facebook" && <SlSocialFacebook size={20} />}
                  {item?.icon === "spotify" && <SlSocialSpotify size={20} />}
                  {item?.icon === "youtube" && <SlSocialYoutube size={20} />}
                  {item?.icon === "tiktok" && <FaTiktok size={20} />}
                  {item?.icon === "soundcloud" && (
                    <SlSocialSoundcloud size={20} />
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
