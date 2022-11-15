"use client";
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { format } from "date-fns";
type Props = {
  url: string;
  requestToPlayUrl: string;
};

type EventItem = {
  artist_id: string;
  datetime: string;
  description: string;
  ends_at: string;
  festival_datetime_display_rule: string;
  festival_end_date: string;
  festival_start_date: string;
  id: string;
  lineup: Array<string>;
  offers: Array<string>;
  on_sale_datetime: string;
  starts_at: string;
  title: string;
  url: string;
  venue: {
    city: string;
    country: string;
    latitude: string;
    location: string;
    longitude: string;
    name: string;
    postal_code: string;
    region: string;
    street_address: string;
  };
};

//TODO handle load more events
const fetcher = (args: any) =>
  axios({
    method: "POST",
    url: args?.url,
    data: args,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);

const TourDates = ({ url: api, requestToPlayUrl }: Props) => {
  const { data, error } = useSWR({ url: "/api/tour", args: { api } }, fetcher);

  //events come in descending order, so we reverse them
  const reversedData = data?.data?.slice().reverse();

  if (error)
    return (
      <div className="my-10 text-center">
        <h3 className="text-white font-semibold text-3xl">{error}</h3>\
        <button className="bg-slate-500/30 text-white px-4 py-2 rounded hover:bg-slate-500 my-4 transition-all">
          Refresh
        </button>
      </div>
    );

  if (data?.data?.length === 0) {
    return (
      <div className="my-10 text-center">
        <h3 className="text-white font-semibold text-3xl">
          No upcoming shows at the moment!
        </h3>
        <a href={requestToPlayUrl} target={"_blank"} rel="noreferrer">
          <button className="bg-slate-500/30 text-white px-4 py-2 rounded hover:bg-slate-500 my-4 transition-all">
            Request a show!
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6 w-full">
      {data?.success &&
        reversedData.map((event: EventItem) => {
          return (
            <div
              key={event?.id}
              className="flex justify-between gap-6 items-center py-2  border-b-[1px] border-slate-400/20"
            >
              <div className="flex justify-start">
                <p className="text-slate-50">
                  {format(new Date(event?.datetime), "PP")}
                </p>
              </div>
              <div className="flex justify-start grow">
                <p className="text-slate-50 ">{event?.venue?.name}</p>
              </div>
              <div className="flex justify-start">
                <p className="text-slate-50 ">
                  {event?.venue?.street_address} {` / `}
                  {event?.venue?.city ?? event?.venue?.location}
                </p>
              </div>
              <div className="flex gap-6 ">
                <a href={event?.url} target="__blank" rel="noreferrer">
                  <button className="text-white text-sm bg-slate-500/30 px-4 py-2 rounded hover:bg-slate-500  transition-all ">
                    Event Page
                  </button>
                </a>
                <a href={event?.url} target="__blank" rel="noreferrer">
                  <button className="text-white text-sm bg-orange-500/30 px-4 py-2 rounded hover:bg-orange-500  transition-all ">
                    Tickets
                  </button>
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TourDates;
