import { DataFetchParams, DataFetchResponse } from "../types/data-fetch.types";
import checkIfLinkedFromPage from "../utilities/helper-functions/checkIfLinkedFromPage";
import { fetchGraphQL } from "./api";

export async function getHeroDataForPage({
  collectionLimit = 1,
  linkedFromPage = "/",
  collectionName = "pageTypeCollection",
}: DataFetchParams): Promise<DataFetchResponse> {
  const entries = await fetchGraphQL(`query {
        heroTypeCollection(limit: ${collectionLimit}) {
            items {
            sys {
                id
            }
            title
            image {
                url
            }
            heading
            cta
            ctaUrl
            subheading
            navLinksCollection {
                items {
                displayTitle
                slug
                sys {
                    id
                }
                }
            }
            linkedFrom {
                pageTypeCollection {
                items {
                    slug
                }
                }
            }
            }
        }
        }
`);

  const heroData = entries?.data?.heroTypeCollection?.items;

  const isLinked = checkIfLinkedFromPage(
    heroData,
    collectionName,
    linkedFromPage
  );

  return {
    message: "success",
    success: true,
    response: isLinked,
  };
}
