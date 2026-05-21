import CTASection from "@/components/home/CTASection";
import IndustryHeroSection from "@/components/industries/IndustryHeroSection";
import HealthcareClinicalControlsSection from "@/components/industries/pages/HealthcareClinicalControlsSection";
import HealthcareEngagementSection from "@/components/industries/pages/HealthcareEngagementSection";
import HealthcareRegulatorsSection from "@/components/industries/pages/HealthcareRegulatorsSection";
import { getHealthcareIndustryPageData } from "@/data/industries/pages/healthcare";

/** `/industries/healthcare` — customize markup here separately from other industries. */
export default function HealthcareIndustryPage() {
  const industry = getHealthcareIndustryPageData();

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
  const regulators = industry.healthcareRegulatorsSection;
  const clinicalControls = industry.healthcareClinicalControlsSection;
  const engagement = industry.healthcareEngagementSection;
  const ctaSectionData = industry.ctaSectionData;

  return (
    <>
      <IndustryHeroSection
        clipPathId="healthcare-hero-clip"
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

      {regulators ? <HealthcareRegulatorsSection data={regulators} /> : null}

      {engagement ? <HealthcareEngagementSection data={engagement} /> : null}
      {clinicalControls ? (
        <HealthcareClinicalControlsSection data={clinicalControls} />
      ) : null}

      {ctaSectionData ? <CTASection data={ctaSectionData} /> : null}
    </>
  );
}
