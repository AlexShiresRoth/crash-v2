import React from "react";
import HeroSection from "../components/hero/hero-section";
import Nav from "../components/navigation/nav";
import SideBar from "../components/navigation/sidebar";
import PageContainer from "../components/page/page-container";
import { getHeroDataForPage } from "../lib/hero-data";
import { getPageData } from "../lib/page-data";

type FetchResponse = {
  message: string;
  success: boolean;
  response: any;
};

async function fetchPageData(slug: string): Promise<FetchResponse> {
  const response = await getPageData(slug);

  return {
    message: "success",
    success: true,
    response,
  };
}

async function getHeroData(
  limit: number,
  slug: string
): Promise<FetchResponse> {
  const heroData = await getHeroDataForPage({
    limit,
    linkedFromPage: slug,
    collectionName: "pageTypeCollection",
  });

  return {
    message: "success",
    success: true,
    response: heroData,
  };
}

const page = async () => {
  const pageData = await fetchPageData("/");

  const heroData = await getHeroData(10, "/");

  console.log("heroData", heroData);
  return (
    <PageContainer>
      <div className="flex flex-col flex-1 grow items-center">
        {pageData?.response?.navigation && (
          <Nav
            navigation={pageData.response.navigation}
            logo={pageData?.response?.logo}
          />
        )}
        <div className="w-3/4 text-white font-bold text-7xl min-h-[4000px]">
          {heroData?.success && (
            <HeroSection heroSection={heroData?.response?.data?.[0]} />
          )}
        </div>
      </div>
      <SideBar socialIcons={pageData?.response?.socialLinksCollection?.items} />
    </PageContainer>
  );
};

export default page;
