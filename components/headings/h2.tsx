import React from "react";

type Props = {
  text: string;
};

const H2 = ({ text }: Props) => {
  return (
    <div className="relative">
      <h2 className="uppercase text-white font-semibold text-4xl bg-black p-2 ">
        {text}
      </h2>
      <div className="h-6 bg-gradient-to-r from-red-500 to-orange-500 -mt-6"></div>
    </div>
  );
};

export default H2;
