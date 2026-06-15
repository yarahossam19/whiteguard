import type { Metadata } from "next";
import FinancialServicesIndustryPage from "@/components/industries/pages/FinancialServicesIndustryPage";
import { getFinancialServicesIndustryPageData } from "@/data/industries/pages/financial-services";

export async function generateMetadata(): Promise<Metadata> {
  const d = getFinancialServicesIndustryPageData();
  const seo = d.seo;
  return {
    title: seo?.title ?? `${d.title} | Whiteguard`,
    description: seo?.description ?? d.description,
  };
}

export default function FinancialServicesIndustryRoutePage() {
  return <FinancialServicesIndustryPage />;
}
