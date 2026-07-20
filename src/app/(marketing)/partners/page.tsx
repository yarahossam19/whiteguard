import type { Metadata } from "next";
import HeroSection from "@/components/partners/HeroSection";
import { buildPageMetadata } from "@/lib/metadata";
import PartnersGrowthSection from "@/components/partners/PartnersGrowthSection";
import PartnersHowItWorksSection from "@/components/partners/PartnersHowItWorksSection";
import PartnersBenefitsSection from "@/components/partners/PartnersBenefitsSection";
import PartnersTypesSection from "@/components/partners/PartnersTypesSection";
import PartnersCallToActionSection from "@/components/partners/PartnersCallToActionSection";
import { getPartnersHeroData } from "@/data/partners-hero";
import { getPartnersLogosData } from "@/data/partners-logos";
import { getPartnersGrowthData } from "@/data/partners-growth";
import { getPartnersHowItWorksData } from "@/data/partners-how-it-works";
import { getPartnersBenefitsData } from "@/data/partners-benefits";
import { getPartnersTypesData } from "@/data/partners-types";
import { getPartnersCtaData } from "@/data/partners-cta";

export const metadata: Metadata = buildPageMetadata({
  path: "/partners",
  title: "Partners",
  description: "Our trusted partners in security.",
});

export default function PartnersPage() {
  const partnersHeroData = getPartnersHeroData();
  const partnersLogosData = getPartnersLogosData();
  const partnersGrowthData = getPartnersGrowthData();
  const partnersHowItWorksData = getPartnersHowItWorksData();
  const partnersBenefitsData = getPartnersBenefitsData();
  const partnersTypesData = getPartnersTypesData();
  const partnersCtaData = getPartnersCtaData();
  return (
    <>
      <HeroSection data={partnersHeroData} logos={partnersLogosData} />
      <PartnersGrowthSection data={partnersGrowthData} />
      <PartnersHowItWorksSection data={partnersHowItWorksData} />
      <PartnersBenefitsSection data={partnersBenefitsData} />
      <PartnersTypesSection data={partnersTypesData} />
      <PartnersCallToActionSection data={partnersCtaData} />
    </>
  );
}
