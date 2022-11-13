import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  message: string;
  success: boolean;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Response> {
  try {
    const request = req.body;

    const apiReq = await fetch(request?.args?.api, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("api req", apiReq?.body);

    return {
      message: "Fetched data",
      success: true,
      data: apiReq?.body,
    };
  } catch (error) {
    console.error("ERROR FETCHING TOUR DATA", error);
    return {
      message: "error",
      success: false,
      data: error,
    };
  }
}
