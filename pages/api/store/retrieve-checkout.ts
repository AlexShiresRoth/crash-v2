import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { checkoutId } = req.body;

    const checkout = await client.checkout.fetch(checkoutId);

    return res.status(200).json({ success: true, checkout });
  } catch (error) {
    console.error("Error retrieving checkout", error);
    return res.status(500).json({ success: false, error });
  }
}
