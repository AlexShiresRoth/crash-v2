import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { checkoutId, itemsToAdd } = req.body;

    if (!checkoutId || !itemsToAdd)
      throw new Error("Missing checkoutId or itemsToAdd");

    const request = await client.checkout
      .addLineItems(checkoutId, itemsToAdd)
      .then((checkout) => checkout);

    console.log("item added to checkout");
    return res.status(200).json({ success: true, cart: request?.lineItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}
