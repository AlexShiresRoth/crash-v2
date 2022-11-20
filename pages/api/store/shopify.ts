import Client from "shopify-buy";

export const client = Client.buildClient({
  domain: "crash-the-calm.myshopify.com",
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN ?? "",
});
