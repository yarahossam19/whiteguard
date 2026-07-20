import type { Metadata } from "next";
import HealthcareIndustryPage from "@/components/industries/pages/HealthcareIndustryPage";
import { getHealthcareIndustryPageData } from "@/data/industries/pages/healthcare";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const d = getHealthcareIndustryPageData();
  const seo = d.seo;
  return buildPageMetadata({
    path: "/industries/healthcare",
    title: seo?.title ?? `${d.title} | WhiteGuard`,
    description: seo?.description ?? d.description,
  });
}

export default function HealthcareIndustryRoutePage() {
  return (
    <>
      <HealthcareIndustryPage />
    </>
  );
}
