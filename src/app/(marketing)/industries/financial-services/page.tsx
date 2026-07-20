import type { Metadata } from "next";
import FinancialServicesIndustryPage from "@/components/industries/pages/FinancialServicesIndustryPage";
import { getFinancialServicesIndustryPageData } from "@/data/industries/pages/financial-services";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const d = getFinancialServicesIndustryPageData();
  const seo = d.seo;
  return buildPageMetadata({
    path: "/industries/financial-services",
    title: seo?.title ?? `${d.title} | WhiteGuard`,
    description: seo?.description ?? d.description,
  });
}

export default function FinancialServicesIndustryRoutePage() {
  return <FinancialServicesIndustryPage />;
}
