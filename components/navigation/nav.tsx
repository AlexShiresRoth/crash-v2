import Link from "next/link";
import React from "react";
import { PageItem } from "../../types/page-item";
import ImageWrapper from "../image/image-wrapper";

type Props = {
  navigation: PageItem["navigation"];
  logo?: PageItem["logo"];
};

const Nav = ({ navigation, logo }: Props) => {
  return (
    <nav className="w-full py-4 flex justify-center items-center border-b-[1px] border-slate-500 bg-black sticky top-0 z-50">
      <div className="w-3/4 flex gap-4 items-center">
        <div className="relative w-[150px] h-[50px] invert mr-6">
          <ImageWrapper imageUrl={logo?.url ?? ""} altText="Crash Logo" />
        </div>
        {navigation?.navigationItemsCollection?.items?.map((item) => (
          <Link
            href={item?.slug}
            key={item?.sys?.id}
            className="text-slate-500  text-lg"
          >
            {item?.displayTitle}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
