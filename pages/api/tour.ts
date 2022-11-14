import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  message: string;
  success: boolean;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const request = req.body;

    const apiReq = await fetch(request?.args?.api, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await apiReq.json();

    return res.status(200).json({
      message: "success",
      success: true,
      data,
    });
  } catch (error) {
    console.error("ERROR FETCHING TOUR DATA", error);
    return res.status(500).json({ message: error, success: false, data: null });
  }
}
