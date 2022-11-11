import React from "react";
import Nav from "../components/navigation/nav";
import SideBar from "../components/navigation/sidebar";
import PageContainer from "../components/page/page-container";
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

const page = async () => {
  const pageData = await fetchPageData("/");

  console.log("page data!", pageData);
  return (
    <PageContainer>
      <div className="flex flex-col flex-1 grow items-center">
        {pageData?.response?.navigation && (
          <Nav navigation={pageData.response.navigation} />
        )}
        <div className="w-3/4 text-white font-bold text-7xl min-h-[4000px]">
          Stuff!
        </div>
      </div>
      <SideBar socialIcons={pageData?.response?.socialLinksCollection?.items}/>
    </PageContainer>
  );
};

export default page;
