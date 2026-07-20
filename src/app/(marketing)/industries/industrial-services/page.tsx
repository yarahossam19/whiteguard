import type { Metadata } from "next";
import IndustrialServicesIndustryPage from "@/components/industries/pages/IndustrialServicesIndustryPage";
import { getIndustrialServicesIndustryPageData } from "@/data/industries/pages/industrial-services";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const d = getIndustrialServicesIndustryPageData();
  const seo = d.seo;
  return buildPageMetadata({
    path: "/industries/industrial-services",
    title: seo?.title ?? `${d.title} | WhiteGuard`,
    description: seo?.description ?? d.description,
  });
}

export default function IndustrialServicesIndustryRoutePage() {
  return (
    <>
      <IndustrialServicesIndustryPage />
    </>
  );
}
