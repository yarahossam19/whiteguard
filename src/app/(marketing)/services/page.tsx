import type { Metadata } from "next";

import ServicesPageClient from "@/components/services/ServicesPageClient";

function pillarTabMeta(title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const OFFENSIVE_TAB_META_TITLE =
  "Offensive Security & Penetration Testing | WhiteGuard";
const OFFENSIVE_TAB_META_DESCRIPTION =
  "Offensive Security by WhiteGuard — penetration testing, vulnerability assessment, red teaming, source code review, cloud security services.";

const DEFENSIVE_TAB_META_TITLE =
  "Defensive Cybersecurity: 24/7 SOC, SIEM, DFIR | WhiteGuard";
const DEFENSIVE_TAB_META_DESCRIPTION =
  "Defensive Cybersecurity by WhiteGuard — 24/7 SOC services, SIEM security incident event management, DFIR, Incident Response across MENA.";

const GRC_TAB_META_TITLE =
  "GRC & Compliance: SAMA, NCA, CBE, ISO 27001 | WhiteGuard";
const GRC_TAB_META_DESCRIPTION =
  "GRC compliance services by WhiteGuard — ISO 27001, SAMA cybersecurity framework, NCA Compliance, PCI-DSS, SOC 2, HIPAA, FRA 139, Aramco CCC.";

const TRAINING_TAB_META_TITLE =
  "Cybersecurity Awareness & VAPT Training | WhiteGuard";
const TRAINING_TAB_META_DESCRIPTION =
  "Cybersecurity awareness training by WhiteGuard — Security Awareness Training, SSDLC Training, VAPT Training, SOC Training. English & Arabic.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const raw = sp?.tab;
  const tab = Array.isArray(raw) ? raw[0] : raw;
  if (tab === "offensive") {
    return pillarTabMeta(OFFENSIVE_TAB_META_TITLE, OFFENSIVE_TAB_META_DESCRIPTION);
  }
  if (tab === "defensive") {
    return pillarTabMeta(DEFENSIVE_TAB_META_TITLE, DEFENSIVE_TAB_META_DESCRIPTION);
  }
  if (tab === "grc") {
    return pillarTabMeta(GRC_TAB_META_TITLE, GRC_TAB_META_DESCRIPTION);
  }
  if (tab === "training") {
    return pillarTabMeta(TRAINING_TAB_META_TITLE, TRAINING_TAB_META_DESCRIPTION);
  }
  return {};
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}
