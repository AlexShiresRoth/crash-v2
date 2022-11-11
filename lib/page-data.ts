import { fetchGraphQL } from "./api";

export async function getPageData(slug: string) {
  const entry = await fetchGraphQL(`query {
  pageTypeCollection(where: { slug_exists: true, slug: "${slug}" }, limit: 10) {
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

  console.log("entry?", entry);

  return entry?.data?.pageTypeCollection?.items[0];
}
