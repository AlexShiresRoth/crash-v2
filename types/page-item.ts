export type PageItem = {
  sys: { id: string };
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string | null;
  logo: {
    url: string;
  };
  socialLinksCollection: {
    items: {
      title: string;
      url: string;
      icon: string;
      sys: {
        id: string;
      };
    }[];
  };
  footer: {
    title: string;
    copyright: string;
    footerNavigationColumnsCollection: {
      items: {
        title: string;
        linksCollection: {
          items: {
            title: string;
            slug: string;
          }[];
        };
      };
    };
    socialLinksCollection: { items: { title: string; slug: string }[] };
  };
  navigation: {
    sys: {
      id: string;
    };
    title: string;
    navigationItemsCollection: {
      items: {
        displayTitle: string;
        slug: string;
        sys: {
          id: string;
        };
      }[];
    };
  };
};
