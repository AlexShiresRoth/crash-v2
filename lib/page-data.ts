import { DataFetchParams, DataFetchResponse } from "../types/data-fetch.types";
import { fetchGraphQL } from "./api";

export async function getPageData({
  slug,
  collectionLimit,
}: DataFetchParams): Promise<DataFetchResponse> {
  const entry = await fetchGraphQL(`query {
  pageTypeCollection(where: { slug_exists: true, slug: "${slug}" }, limit: ${collectionLimit}) {
    items {
      sys {
        id
      }
      title
      slug
      seoTitle
      seoDescription
      logo {
        url
      }
      footer {
        title
        copyright
        footerNavigationColumnsCollection(limit: 6) {
          items {
            sys {
              id
            }
            navigationItemsCollection {
              items {
                displayTitle
                slug
              }
            }
          }
        }
      }
      socialLinksCollection(limit: 10) {
        items {
          title
          url
          icon
          sys {
            id
          }
        }
      }
      navigation {
        sys {
          id
        }
        title
        navigationItemsCollection(limit: 10) {
          items {
            displayTitle
            slug
            sys {
              id
            }
          }
        }
      }
    }
  }
}
`);

  return {
    message: "Data fetched for page " + slug,
    success: true,
    response: entry?.data?.pageTypeCollection?.items[0],
  };
}
