export type DataFetchResponse = {
  message: string;
  success: boolean;
  response: any;
};

export type DataFetchParams = {
  slug?: string;
  collectionName?: string;
  collectionLimit?: number;
  linkedFromPage?: string;
};
