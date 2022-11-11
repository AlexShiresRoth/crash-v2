import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: Props) => {
  return <div className="bg-black min-h-screen flex justify-center ">{children}</div>;
};

export default PageContainer;
