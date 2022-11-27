export type CHECKOUT_TYPE = {
  webUrl: string;
  id: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    id: string;
    quantity: number;
    title: string;
    variant: {
      id: string;
      title: string;
      image: {
        src: string;
        id: string;
      };
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }[];
};
