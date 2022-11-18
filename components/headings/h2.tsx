import React from "react";

type Props = {
  text: string;
};

const H2 = ({ text }: Props) => {
  return (
    <h2 className="uppercase text-white font-semibold text-4xl bg-black border-b-2 border-orange-500 pb-2">
      {text}
    </h2>
  );
};

export default H2;
