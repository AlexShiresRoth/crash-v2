import Link from "next/link";
import React from "react";
import { PageItem } from "../../types/page-item";

type Props = {
  navigation: PageItem["navigation"];
};

const Nav = ({ navigation }: Props) => {
  return (
    <nav className="w-full py-4 flex justify-center border-b-[1px] border-slate-500  sticky top-0">
      <div className="w-3/4 flex gap-4 ">
        {navigation?.navigationItemsCollection?.items?.map((item) => (
          <Link
            href={item?.slug}
            key={item?.sys?.id}
            className="text-slate-500 font-semibold text-lg"
          >
            {item?.displayTitle}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
