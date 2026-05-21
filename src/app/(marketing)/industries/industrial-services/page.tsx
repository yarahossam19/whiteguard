import type { Metadata } from "next";
import IndustrialServicesIndustryPage from "@/components/industries/pages/IndustrialServicesIndustryPage";
import { getIndustrialServicesIndustryPageData } from "@/data/industries/pages/industrial-services";

export async function generateMetadata(): Promise<Metadata> {
  const d = getIndustrialServicesIndustryPageData();
  const seo = d.seo;
  return {
    title: seo?.title ?? `${d.title} | WHITEGUARD`,
    description: seo?.description ?? d.description,
  };
}

export default function IndustrialServicesIndustryRoutePage() {
  return (
    <>
      <IndustrialServicesIndustryPage />
    </>
  );
}
