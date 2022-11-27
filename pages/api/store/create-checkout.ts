import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "crash-the-calm.myshopify.com",
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN ?? "",
});

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const checkout = await client.checkout
      .create()
      .then((checkout) => checkout);

    if (!checkout) throw new Error("Could not create checkout");

    return res
      .status(200)
      .json({ success: true, checkout: JSON.stringify(checkout) });
  } catch (error) {
    console.error("Error creating checkout", error);
    return res.status(500).json({ success: false, error });
  }
}
