import React from "react";

type Props = {
  children: React.ReactNode;
};

const StoreItems = ({ children }: Props) => {
  return (
    <div className="flex flex-wrap justify-between gap-4 w-full mt-6">
      {children}
    </div>
  );
};

export default StoreItems;
