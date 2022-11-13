"use client";
import React from "react";
import useSWR from "swr";
import axios from "axios";
type Props = {
  url: string;
};

const fetcher = (args: any) =>
  axios({
    method: "POST",
    url: args?.url,
    data: args,
  }).then((res) => res.data);

const TourDates = ({ url: api }: Props) => {
  const { data, error } = useSWR({ url: "/api/tour", args: { api } }, fetcher);

  console.log("data", data, error);
  return <div>TourDates</div>;
};

export default TourDates;
