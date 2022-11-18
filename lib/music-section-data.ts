import { DataFetchParams, DataFetchResponse } from "../types/data-fetch.types";
import checkIfLinkedFromPage from "../utilities/helper-functions/checkIfLinkedFromPage";
import { fetchGraphQL } from "./api";

export async function getMusicSectionData({
  collectionLimit,
  collectionName = "pageTypeCollection",
  linkedFromPage = "/",
}: DataFetchParams): Promise<DataFetchResponse> {
  const response = await fetchGraphQL(`
        query {
            musicSectionCollection(limit: ${collectionLimit}) {
                items {
                linkedFrom {
                    pageTypeCollection(limit: 10) {
                    items {
                        slug
                    }
                    }
                }
                title
                platformEmbedsCollection(limit: 4) {
                    items {
                    title
                    embedType
                    iframeSource
                    sys {
                        id
                    }
                    }
                }
                }
            }
        }
    `);

  const data = checkIfLinkedFromPage(
    response?.data?.musicSectionCollection?.items[0],
    collectionName,
    linkedFromPage
  );

  return {
    message: "Success",
    success: true,
    response: data,
  };
}
