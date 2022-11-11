export type HeroData = {
  sys: { id: string };
  title: string;
  image: {
    url: string;
  };
  heading: string;
  cta: string;
  ctaUrl: string;
  subheading: string;
  navLinksCollection: {
    items: Array<{ displayTitle: string; slug: string; sys: { id: string } }>;
  };
  linkedFrom: { pageTypeCollection: { items: Array<{ slug: string }> } };
};
