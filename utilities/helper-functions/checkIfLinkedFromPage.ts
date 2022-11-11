type CollectionType = {
  linkedFrom: {
    [key: string]: {
      items: {
        slug: string;
      }[];
    };
  };
};

//This function checks if the collection being provided is linked from the page being provided
export default function checkIfLinkedFromPage(
  collection: CollectionType[] | CollectionType,
  collectionName: string,
  linkedFromKey: string
): any {
  //collection can be an array or an object
  if (Array.isArray(collection)) {
    const isLinkedFromPage = collection.filter((item: CollectionType) => {
      return item?.linkedFrom?.[collectionName]?.items?.find(
        (item) => item?.slug === linkedFromKey
      );
    });
    return isLinkedFromPage;
  }

  //items can be more than one
  return collection?.linkedFrom?.[collectionName]?.items?.find(
    (item) => item?.slug === linkedFromKey
  )
    ? collection
    : null;
}
