import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lineItemsToRemove, checkoutId } = req.body;

    console.log("llineItemsToRemove", lineItemsToRemove, checkoutId);

    const checkout = await client.checkout
      .removeLineItems(checkoutId, lineItemsToRemove)
      .then((checkout) => checkout);

    return res.status(200).json({ success: true, checkout });
  } catch (error) {
    console.error("Error removing from cart", error);
    return res.status(500).json({ success: false, error });
  }
}
