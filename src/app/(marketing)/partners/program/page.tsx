import type { Metadata } from "next";
import PartnerProgramHero from "@/components/partners/program/PartnerProgramHero";
import PartnerProgramWhySection from "@/components/partners/program/PartnerProgramWhySection";
import PartnerProgramAudienceSection from "@/components/partners/program/PartnerProgramAudienceSection";
import PartnerProgramEngageSection from "@/components/partners/program/PartnerProgramEngageSection";
import PartnerProgramCapabilitiesSection from "@/components/partners/program/PartnerProgramCapabilitiesSection";
import PartnerProgramBenefitsMarquee from "@/components/partners/program/PartnerProgramBenefitsMarquee";
import PartnerProgramTiersSection from "@/components/partners/program/PartnerProgramTiersSection";
import PartnerProgramCtaSection from "@/components/partners/program/PartnerProgramCtaSection";
import { getPartnerProgramData } from "@/data/partner-program";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Partner Program",
  description:
    "Partner with WHITEGUARD to deliver offensive, defensive, GRC, and training services across MENA from one trusted ecosystem.",
};

export default function PartnerProgramPage() {
  const data = getPartnerProgramData();

  return (
    <>
      <PartnerProgramHero data={data.hero} />
      <PartnerProgramWhySection data={data.whyPartner} />
      <PartnerProgramAudienceSection data={data.audience} />
      <PartnerProgramEngageSection data={data.engage} />
      <PartnerProgramCapabilitiesSection data={data.capabilities} />
      <PartnerProgramBenefitsMarquee data={data.benefits} />
      <PartnerProgramTiersSection data={data.tiers} />
      {/* <PartnerProgramCtaSection data={data.cta} /> */}
      <CTASection data={data.cta} />
    </>
  );
}
