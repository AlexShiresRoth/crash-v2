export type MusicSectionDataType = {
  title: string;
  platformEmbedsCollection: {
    items: {
      title: string;
      embedType: string;
      iframeSource: string;
      sys: { id: string };
    }[];
  };
};
