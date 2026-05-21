import CTASection from "@/components/home/CTASection";
import IndustryHeroSection from "@/components/industries/IndustryHeroSection";
import FinancialBankingCybersecuritySection from "@/components/industries/pages/FinancialBankingCybersecuritySection";
import FinancialTelemetryFabricSection from "@/components/industries/pages/FinancialTelemetryFabricSection";
import FinancialInsuranceCybersecurityBandSection from "@/components/industries/pages/FinancialInsuranceCybersecurityBandSection";
import { getFinancialServicesIndustryPageData } from "@/data/industries/pages/financial-services";

/** `/industries/financial-services` — dedicated layout & copy (edit JSON + this file independently). */
export default function FinancialServicesIndustryPage() {
  const industry = getFinancialServicesIndustryPageData();

  const imageSrc =
    typeof industry.image === "string" && industry.image.length > 0
      ? industry.image
      : "/images/industries/technology.png";

  const supportTitle = industry.supportHeading ?? "How we support your sector";
  const primaryHref = industry.primaryCtaHref ?? "/contact";
  const secondCta = industry.secondaryCta ?? {
    label: "Explore services",
    href: "/services",
    external: false,
  };

  const hero = industry.hero;
  const headline = hero?.headline ?? industry.title;
  const intro = hero?.intro ?? industry.description;
  const heroImageSrc = hero?.image ?? imageSrc;
  const heroLogos =
    hero?.logoStrip ??
    industry.certifications.map((c) => ({ name: c.name, src: c.src }));
  const showDetailSectionImage = hero?.showDetailSectionImage ?? true;

  const banking = industry.bankingCybersecuritySection;
  const telemetryFabric = industry.financialTelemetryFabricSection;
  const insuranceBand = industry.insuranceCybersecurityBand;
  const ctaSectionData = industry.ctaSectionData;
  return (
    <>
      <IndustryHeroSection
        clipPathId="financial-services-hero-clip"
        headline={headline}
        intro={intro}
        heroImageSrc={heroImageSrc}
        heroImageAlt={headline}
        logos={heroLogos}
        primaryHref={primaryHref}
        primaryLabel={industry.ctaLabel}
        secondaryLabel={secondCta.label}
        secondaryHref={secondCta.href}
        secondaryExternal={secondCta.external === true}
      />
      {banking ? <FinancialBankingCybersecuritySection data={banking} /> : null}
      {telemetryFabric ? (
        <FinancialTelemetryFabricSection data={telemetryFabric} />
      ) : null}
      {insuranceBand ? (
        <FinancialInsuranceCybersecurityBandSection data={insuranceBand} />
      ) : null}
      {ctaSectionData ? <CTASection data={ctaSectionData} /> : null}
    </>
  );
}
