import checkIfLinkedFromPage from "../utilities/helper-functions/checkIfLinkedFromPage";
import { fetchGraphQL } from "./api";

type Params = {
  limit: number;
  linkedFromPage: string;
  collectionName: string;
};

type Response = {
  message: string;
  success: boolean;
  data: Array<any>;
};

export async function getHeroDataForPage({
  limit,
  linkedFromPage,
  collectionName = "pageTypeCollection",
}: Params): Promise<Response> {
  const entries = await fetchGraphQL(`query {
        heroTypeCollection(limit: ${limit}) {
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
    data: isLinked,
  };
}
