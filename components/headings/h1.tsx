import React from "react";

type Props = {
  text: string;
};
const H1 = ({ text }: Props) => {
  return <h1 className="text-slate-50 uppercase font-semibold text-7xl">{text}</h1>;
};

export default H1;
