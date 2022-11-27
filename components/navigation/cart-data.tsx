"use client";

import React from "react";

type Props = {
  itemsLength: number;
};

const CartData = ({ itemsLength }: Props) => {
  return <span className="text-white">{itemsLength}</span>;
};

export default CartData;
