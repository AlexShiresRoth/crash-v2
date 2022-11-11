import { PageItem } from "../../component-types/page-item";

type DataFetchReturnProps = {
  message: string;
  success: boolean;
  data: PageItem | any;
};

type DataFetchParams = {
  args?: any | undefined | null;
  callback: (data?: any) => Promise<DataFetchReturnProps>;
};

export const fetchDataForPage = async ({
  args,
  callback,
}: DataFetchParams): Promise<DataFetchReturnProps> => {
  try {
    const response = await callback(args ?? null);

    if (!response)
      return {
        message: "No response",
        success: false,
        data: null,
      };

    return {
      message: "Data fetched",
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      message: "Error fetching data",
      success: false,
      data: null,
    };
  }
};
