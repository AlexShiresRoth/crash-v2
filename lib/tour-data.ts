import { DataFetchParams, DataFetchResponse } from "../types/data-fetch.types";
import checkIfLinkedFromPage from "../utilities/helper-functions/checkIfLinkedFromPage";
import { fetchGraphQL } from "./api";

export async function getTourSectionData({
  collectionLimit = 1,
  linkedFromPage = "/",
  collectionName = "pageTypeCollection",
}: DataFetchParams): Promise<DataFetchResponse> {
  const entries = await fetchGraphQL(`query {
  tourTypeCollection(limit:${collectionLimit}) {
    items {
      linkedFrom {
        pageTypeCollection(limit:4){
          items {
            slug
          }
        }
      }
      title
      publicApiKey
      followButtontext
      followButtonLink
      requestButtonText
      requestButtonLink
      showTourDateText
      showTourNameText
      showTourLocationText
      showTourEventPageButton
      showNotifyMeButton
      sys {
        id
      }
    }
  } 
}`);

  const isLinked = checkIfLinkedFromPage(
    entries?.data?.tourTypeCollection?.items,
    collectionName,
    linkedFromPage
  );

  return {
    message: "Tour data fetched successfully",
    success: true,
    response: isLinked,
  };
}
