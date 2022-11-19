import Client from "shopify-buy";
import { DataFetchResponse } from "../types/data-fetch.types";

const client = Client.buildClient({
  domain: "crash-the-calm.myshopify.com",
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN ?? "",
});

type Params = {
  itemLimit?: number;
};

export async function getShopifyStoreItems({
  itemLimit = 10,
}: Params): Promise<DataFetchResponse> {
  try {
    const products = await client.product
      .fetchAll(100)
      .then((products) => {
        return products
          .map((product) => {
            return {
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.variants[0].price,
              images: product.images,
              variants: product.variants,
              options: product.options,
              date: product?.attrs?.createdAt?.value,
            };
          })
          .sort((a, b) =>
            new Date(a?.date).getTime() > new Date(b?.date).getTime() ? -1 : 1
          )
          .slice(0, itemLimit);
      })
      .catch((err) => console.error("Error fetching products", err));

    return {
      message: "Success",
      success: true,
      response: products,
    };
  } catch (error) {
    return {
      message: "Error",
      success: false,
      response: error,
    };
  }
}
