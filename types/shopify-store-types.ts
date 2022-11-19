export type StoreItemType = {
  id: string;
  title: string;
  description: string;
  price: {
    amount: number | string;
    currencyCode: string;
    type: string;
  };
  images: Array<{ src: string }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    available: string;
    sku: string | number;
    image: {
      src: string;
    };
  }>;
  options: Array<any>;
};
