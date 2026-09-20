import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ClientProofSection from "@/components/home/ClientProofSection";
import ServiceCategoriesSection from "@/components/home/ServiceCategoriesSection";
import CoverageSection from "@/components/home/CoverageSection";
import WhiteHawkSection from "@/components/home/WhiteHawkSection";
import ProcessSection from "@/components/home/ProcessSection";
import SectorsSection from "@/components/home/SectorsSection";
import ProofSection from "@/components/home/ProofSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import InsightsSection from "@/components/home/InsightsSection";
import CTASection from "@/components/home/CTASection";
import { buildPageMetadata } from "@/lib/metadata";
import { getHeroData } from "@/data/hero";
import { getClientLogosData } from "@/data/client-logos";
import { getHomeMetricsData } from "@/data/home-metrics";
import { getServicesSectionData } from "@/data/services-section";
import { getHomeCoverageData } from "@/data/home-coverage";
import { getWhiteHawkSectionData } from "@/data/white-hawk-section";
import { getHomeProcessData } from "@/data/home-process";
import { getIndustriesSectionsData } from "@/data/industries-sections";
import { getHomeProofData } from "@/data/home-proof";
import { getTestimonialsSectionData } from "@/data/testimonials-section";
import { getCertificationsSectionData } from "@/data/certifications-section";
import { getResourcesData } from "@/data/resources";
import { getCtaSectionData } from "@/data/cta-section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebSiteSchema } from "@/lib/schema";

const HOME_META_TITLE = "WhiteGuard | Enterprise Cybersecurity Services";
const HOME_META_DESCRIPTION =
  "WhiteGuard is the cybersecurity company protecting 64+ MENA enterprises — managed security services, 24/7 SOC, SAMA, CBE & ISO 27001 ready.";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: HOME_META_TITLE,
  description: HOME_META_DESCRIPTION,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildWebSiteSchema()} />

      {/* 01 Hero - orbit labels reuse the service pillars so they stay in sync */}
      <HeroSection
        data={getHeroData()}
        pillars={getServicesSectionData().services}
      />

      {/* 02 Client logos + metrics */}
      <ClientProofSection
        data={getHomeMetricsData()}
        logos={getClientLogosData()}
      />

      {/* 03 Four service categories */}
      <ServiceCategoriesSection data={getServicesSectionData()} />

      {/* 04 Coverage visual */}
      <CoverageSection data={getHomeCoverageData()} />

      {/* 05 White Hawk */}
      <WhiteHawkSection data={getWhiteHawkSectionData()} />

      {/* 06 How we work */}
      <ProcessSection data={getHomeProcessData()} />

      {/* 07 Who we serve */}
      <SectorsSection data={getIndustriesSectionsData()} />

      {/* 08 Proof */}
      <ProofSection
        data={getHomeProofData()}
        testimonials={getTestimonialsSectionData()}
      />

      {/* 09 Certifications & compliance */}
      <CertificationsSection data={getCertificationsSectionData()} />

      {/* 10 Latest insights */}
      <InsightsSection data={getResourcesData()} />

      {/* 11 Final CTA */}
      <CTASection data={getCtaSectionData()} />

    </>
  );
}
