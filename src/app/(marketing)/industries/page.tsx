import CTASection from "@/components/home/CTASection";
import IndustriesBannerSection from "@/components/industries/IndustriesBannerSection";
import IndustriesSectionsSection from "@/components/industries/IndustriesSectionsSection";
import IndustriesProcessSection from "@/components/industries/IndustriesProcessSection";
import IndustriesWhySection from "@/components/industries/IndustriesWhySection";
import { getCtaSectionData } from "@/data/cta-section";
import { getIndustriesBannerData } from "@/data/industries-banner";
import { getIndustriesProcessData } from "@/data/industries-process";
import { getIndustriesSectionsData } from "@/data/industries-sections";
import { getIndustriesWhyData } from "@/data/industries-why";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/industries",
  title: "Industries",
  description:
    "Industry-specific cybersecurity from WhiteGuard — tailored offensive, defensive, GRC, and training solutions for banking, healthcare, energy, government, and more across MENA.",
});

export default function IndustriesPage() {
  const bannerData = getIndustriesBannerData();
  const sectionsData = getIndustriesSectionsData();
  const whyData = getIndustriesWhyData();
  const processData = getIndustriesProcessData();
  const ctaData = getCtaSectionData();
  return (
    <>
      <IndustriesBannerSection data={bannerData} />
      <IndustriesSectionsSection data={sectionsData} />
      <IndustriesWhySection data={whyData} />
      <IndustriesProcessSection data={processData} />
      <CTASection data={ctaData} />
    </>
  );
}
