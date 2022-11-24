import axios from "axios";
import React from "react";
import useSWR from "swr";

type Props = {
  checkoutId: string;
};

const fetcher = ({ url, args }: { url: string; args: any }) =>
  axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: args,
  }).then((res) => res.data);

const CartData = ({ checkoutId }: Props) => {
  const { data, error } = useSWR(
    {
      url: "/api/store/retrieve-checkout",
      args: { checkoutId },
    },
    fetcher
  );

  console.log("data", data);
  return !error ? (
    <span className="text-white">{data?.checkout?.lineItems?.length}</span>
  ) : null;
};

export default CartData;
