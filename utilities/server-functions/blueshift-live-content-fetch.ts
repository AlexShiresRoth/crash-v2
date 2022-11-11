import { BlueshiftLiveContentItem } from "../../component-types/blueshift-live-content-item";
import serverFetch from "./server-fetch";

type LiveAdsProps = {
  slotName: string;
  api_key: string;
};

//live content fetch is a dynamic function and is not cached
export const liveContentFetch = async ({
  slotName,
  api_key,
}: LiveAdsProps): Promise<{
  message: string;
  success: boolean;
  liveContent: BlueshiftLiveContentItem | null;
}> => {
  if (!slotName || !api_key)
    return {
      message: "Missing slotName or api_key",
      success: false,
      liveContent: null,
    };
  try {
    // const liveContent = await serverFetch({
    //   url: "https://api.getblueshift.com/live",
    //   method: "POST",
    //   bodyParams: {
    //     slot: slotName,
    //     api_key,
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // });
    const liveContent = await fetch("https://api.getblueshift.com/live", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        slot: slotName,
        api_key,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const response = await liveContent?.json();

    if (!liveContent)
      return {
        message: "No live content found",
        success: false,
        liveContent: null,
      };

    return {
      message: "Live content found",
      success: true,
      liveContent: response,
    };
  } catch (error) {
    console.error("Error fetching live content", error);
    return {
      message: "Error fetching live content",
      success: false,
      liveContent: null,
    };
  }
};
