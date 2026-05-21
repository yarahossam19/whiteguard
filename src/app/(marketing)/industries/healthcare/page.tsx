import type { Metadata } from "next";
import HealthcareIndustryPage from "@/components/industries/pages/HealthcareIndustryPage";
import { getHealthcareIndustryPageData } from "@/data/industries/pages/healthcare";

export async function generateMetadata(): Promise<Metadata> {
  const d = getHealthcareIndustryPageData();
  const seo = d.seo;
  return {
    title: seo?.title ?? `${d.title} | WHITEGUARD`,
    description: seo?.description ?? d.description,
  };
}

export default function HealthcareIndustryRoutePage() {
  return (
    <>
      <HealthcareIndustryPage />
    </>
  );
}
