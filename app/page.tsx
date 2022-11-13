import React from "react";
import HeroSection from "../components/hero/hero-section";
import Nav from "../components/navigation/nav";
import SideBar from "../components/navigation/sidebar";
import PageContainer from "../components/page/page-container";
import TourSeciton from "../components/tour/tour-section";
import { getHeroDataForPage } from "../lib/hero-data";
import { getPageData } from "../lib/page-data";
import { getTourSectionData } from "../lib/tour-data";
import { DataFetchResponse } from "../types/data-fetch.types";

type FetchParams = {
  args: {
    linkedFromPage?: string;
    collectionName?: string;
    collectionLimit?: number;
    slug?: string;
  };
  callback: (data: any) => Promise<DataFetchResponse>;
};

async function getData({
  args,
  callback,
}: FetchParams): Promise<{ data: any }> {
  const response = await callback(args);

  return { data: response };
}

const page = async () => {
  const collectionName = "pageTypeCollection";

  const slug = "/";

  const { data: pageData } = await getData({
    args: { slug, collectionLimit: 10 },
    callback: getPageData,
  });

  const { data: heroData } = await getData({
    args: { collectionName, linkedFromPage: slug, collectionLimit: 10 },
    callback: getHeroDataForPage,
  });

  const tourData = await getTourSectionData({
    collectionLimit: 5,
    linkedFromPage: slug,
    collectionName,
  });

  return (
    <PageContainer>
      <div className="flex flex-col flex-1 grow items-center">
        {pageData?.response?.navigation && (
          <Nav
            navigation={pageData.response.navigation}
            logo={pageData?.response?.logo}
          />
        )}
        {heroData?.success && (
          <HeroSection heroSection={heroData?.response?.[0]} />
        )}

        {tourData?.success && <TourSeciton data={tourData?.response?.[0]} />}
      </div>
      {pageData?.success && (
        <SideBar
          socialIcons={pageData?.response?.socialLinksCollection?.items}
        />
      )}
    </PageContainer>
  );
};

export default page;
