/** Shared shapes for static industry detail pages (`/industries/...`). */

import { CtaSectionData } from "@/data/cta-section";

export interface IndustryHeroLogoStripItem {
  name: string;
  src: string;
}

export interface IndustryPageHero {
  headline?: string;
  intro?: string;
  image?: string;
  logoStrip?: IndustryHeroLogoStripItem[];
  showDetailSectionImage?: boolean;
}

export interface IndustryPageCertification {
  id: number;
  name: string;
  src: string;
}

/** Financial services — “Banking cybersecurity” band + proof card (Figma). */
export interface BankingCybersecurityFeature {
  title: string;
  description: string;
}

export interface BankingCybersecurityPartnerLogo {
  src: string;
  alt: string;
}

export interface BankingCybersecurityProofCard {
  title: string;
  subtitle: string;
  footerCaption: string;
  grcBadgeSrc: string;
  grcBadgeAlt: string;
  grcLabel: string;
  regulatorColumn: { heading: string; items: string[] };
  customerColumn: { heading: string; items: string[] };
}

export interface BankingCybersecuritySectionData {
  heading: string;
  paragraphs: string[];
  features: [BankingCybersecurityFeature, BankingCybersecurityFeature];
  partnerLogos: BankingCybersecurityPartnerLogo[];
  proofCard: BankingCybersecurityProofCard;
}

/** Financial services — “Financial telemetry fabric” illustration + prose (Figma `2884:8332`). */
export interface FinancialTelemetryFabricSectionData {
  /** Copy inside rounded illustration card (#E7F6FF). */
  illustrationCard: {
    title: string;
    subtitle: string;
  };
  headline: string;
  paragraphs: string[];
  features: [BankingCybersecurityFeature, BankingCybersecurityFeature];
  partnerLogos: BankingCybersecurityPartnerLogo[];
}

/** Figma `2900:12540`: copy + 2×2 checklist + claims vault card. */
export interface InsuranceCybersecurityBandData {
  headline: string;
  body: string;
  checklist: [string, string, string, string];
  illustrationCard: {
    title: string;
    subtitle: string;
  };
}

/** Figma `2928:8031` — healthcare regulators + evidence map card. */
export interface HealthcareRegulatorCardData {
  title: string;
  body: string;
  /** Matches icon frame size variants in Figma (`2935:8792` … `2935:8914`). */
  iconVariant?: "compact" | "tall" | "wide" | "HIPAA" | "gdpr" | "fda" | "KSA" | "SCFHS" | "ISO" | "ISO"|"IEC";
}

export interface HealthcareRegulatorsSectionData {
  headline: string;
  intro: string;
  /** Each inner array is one row (usually 2 cards; last row may be one). */
  regulatorRows: HealthcareRegulatorCardData[][];
  illustrationCard: {
    title: string;
    subtitle: string;
  };
}

/** Figma `2943:9146` — “How We Engage on Healthcare Cybersecurity” + three cards. */
export type HealthcareEngagementCardData =
  | {
      variant: "chips";
      title: string;
      body: string;
      chips: string[];
      imageSrc: string;
      imageAlt?: string;
    }
  | {
      variant: "imageFade";
      title: string;
      body: string;
      imageSrc: string;
      imageAlt?: string;
    }
  | {
      variant: "image";
      title: string;
      body: string;
      imageSrc: string;
      imageAlt?: string;
    };

export interface HealthcareEngagementSectionData {
  headline: string;
  intro: string; 
  cards: [
    HealthcareEngagementCardData,
    HealthcareEngagementCardData,
    HealthcareEngagementCardData,
  ];
}

/** Figma `2928:8144` — clinical controls band + medical device inventory illustration. */
export interface HealthcareClinicalControlsFeature {
  title: string;
  description: string;
}

export interface HealthcareClinicalControlsInventoryRow {
  iconSrc: string;
  iconAlt: string;
  name: string;
  /** Status label (neutral / success / warning / danger / muted). */
  status: string;
  statusTone: "neutral" | "success" | "warning" | "danger" | "muted";
  /** Figma omits Review on first row (“Analyzing”). */
  showReview?: boolean;
}

export interface HealthcareClinicalControlsSectionData {
  headline: string;
  intro: string;
  features: [
    HealthcareClinicalControlsFeature,
    HealthcareClinicalControlsFeature,
    HealthcareClinicalControlsFeature,
    HealthcareClinicalControlsFeature,
  ];
  illustrationCard: {
    title: string;
    subtitle: string;
  };
  inventoryRows: [
    HealthcareClinicalControlsInventoryRow,
    HealthcareClinicalControlsInventoryRow,
    HealthcareClinicalControlsInventoryRow,
    HealthcareClinicalControlsInventoryRow,
  ];
}

/** Figma `2996:27031` — Automotive cybersecurity band + three battlefields illustration. */
export interface IndustrialAutomotiveBattlefieldBandData {
  headline: string;
  intro: string;
  features: [
    BankingCybersecurityFeature,
    BankingCybersecurityFeature,
  ];
  illustrationCard: {
    title: string;
    subtitle: string;
  };
}

/** Figma `2996:27083` — manufacturing cybersecurity + continuity map illustration (card left column). */
export interface IndustrialManufacturingCyberBandData {
  illustrationCard: {
    title: string;
    subtitle: string;
  };
  illustrationImageSrc: string;
  illustrationImageAlt?: string;
  headline: string;
  intro: string;
  features: [
    BankingCybersecurityFeature,
    BankingCybersecurityFeature,
  ];
}

/** Figma `2996:27119` — Oil & Gas cybersecurity + checklist + SCADA card. */
export interface IndustrialOilGasCyberBandData {
  headline: string;
  intro: string;
  checklistItems: [string, string, string, string];
  illustrationCard: {
    title: string;
    subtitle: string;
  };
}

export interface IndustryPageData {
  slug: string;
  title: string;
  description: string;
  hero?: IndustryPageHero;
  supportHeading?: string;
  image: string;
  ctaLabel: string;
  primaryCtaHref?: string;
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  bullets: string[];
  certifications: IndustryPageCertification[];
  seo?: {
    title?: string;
    description?: string;
  };
  /** Present only on pages that implement this band (e.g. financial-services). */
  bankingCybersecuritySection?: BankingCybersecuritySectionData;
  /** Figma frame `2884:8332` — white telemetry band + prose. */
  financialTelemetryFabricSection?: FinancialTelemetryFabricSectionData;
  /** Figma frame `2900:12540` — Insurance copy left + claims vault illustration right. */
  insuranceCybersecurityBand?: InsuranceCybersecurityBandData;
  /** Figma `2928:8031` — healthcare regulators + evidence map illustration. */
  healthcareRegulatorsSection?: HealthcareRegulatorsSectionData;
  /** Figma `2943:9146` — healthcare engagement pillars (three cards). */
  healthcareEngagementSection?: HealthcareEngagementSectionData;
  /** Figma `2928:8144` — clinical controls + device inventory illustration. */
  healthcareClinicalControlsSection?: HealthcareClinicalControlsSectionData;
  /** Figma `2996:27031` — industrial automotive battlefield + illustration card. */
  industrialAutomotiveBattlefieldBand?: IndustrialAutomotiveBattlefieldBandData;
  /** Figma `2996:27083` — manufacturing cybersecurity + continuity map card (left column). */
  industrialManufacturingCyberBand?: IndustrialManufacturingCyberBandData;
  /** Figma `2996:27119` — oil & gas + SCADA checklist + illustration card right. */
  industrialOilGasCyberBand?: IndustrialOilGasCyberBandData;
  /** Figma `2884:8384` — CTA section copy left + illustration right. */
  ctaSectionData?: CtaSectionData;
}
