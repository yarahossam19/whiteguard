import CTASection from "@/components/home/CTASection";
import IndustryHeroSection from "@/components/industries/IndustryHeroSection";
import IndustrialAutomotiveBattlefieldSection from "@/components/industries/pages/IndustrialAutomotiveBattlefieldSection";
import IndustrialManufacturingCyberSection from "@/components/industries/pages/IndustrialManufacturingCyberSection";
import IndustrialOilGasCyberSection from "@/components/industries/pages/IndustrialOilGasCyberSection";
import { getIndustrialServicesIndustryPageData } from "@/data/industries/pages/industrial-services";

/** `/industries/industrial-services` — customize markup here separately from other industries. */
export default function IndustrialServicesIndustryPage() {
  const industry = getIndustrialServicesIndustryPageData();

  const imageSrc =
    typeof industry.image === "string" && industry.image.length > 0
      ? industry.image
      : "/images/industries/technology.png";

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
  const automotiveBand = industry.industrialAutomotiveBattlefieldBand;
  const manufacturingBand = industry.industrialManufacturingCyberBand;
  const oilGasBand = industry.industrialOilGasCyberBand;
  const ctaSectionData = industry.ctaSectionData;
  return (
    <>
      <IndustryHeroSection
        clipPathId="industrial-services-hero-clip"
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

      {automotiveBand ? (
        <IndustrialAutomotiveBattlefieldSection data={automotiveBand} />
      ) : null}

      {manufacturingBand ? (
        <IndustrialManufacturingCyberSection data={manufacturingBand} />
      ) : null}

      {oilGasBand ? <IndustrialOilGasCyberSection data={oilGasBand} /> : null}

      {ctaSectionData ? <CTASection data={ctaSectionData} /> : null}
    </>
  );
}
