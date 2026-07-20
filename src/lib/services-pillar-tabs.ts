import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/metadata";

export const SERVICE_PILLAR_TABS = [
  "offensive",
  "defensive",
  "grc",
  "training",
] as const;

export type ServicePillarTab = (typeof SERVICE_PILLAR_TABS)[number];

const PILLAR_TAB_META: Record<
  ServicePillarTab,
  { title: string; description: string }
> = {
  offensive: {
    title: "Offensive Security & Penetration Testing | WhiteGuard",
    description:
      "Offensive Security by WhiteGuard — penetration testing, vulnerability assessment, red teaming, source code review, cloud security services.",
  },
  defensive: {
    title: "Defensive Cybersecurity: 24/7 SOC, SIEM, DFIR | WhiteGuard",
    description:
      "Defensive Cybersecurity by WhiteGuard — 24/7 SOC services, SIEM security incident event management, DFIR, Incident Response across MENA.",
  },
  grc: {
    title: "GRC & Compliance: SAMA, NCA, CBE, ISO 27001 | WhiteGuard",
    description:
      "GRC compliance services by WhiteGuard — ISO 27001, SAMA cybersecurity framework, NCA Compliance, PCI-DSS, SOC 2, HIPAA, FRA 139, Aramco CCC.",
  },
  training: {
    title: "Cybersecurity Awareness & VAPT Training | WhiteGuard",
    description:
      "Cybersecurity awareness training by WhiteGuard — Security Awareness Training, SSDLC Training, VAPT Training, SOC Training. English & Arabic.",
  },
};

export function isServicePillarTab(value: string): value is ServicePillarTab {
  return (SERVICE_PILLAR_TABS as readonly string[]).includes(value);
}

export function servicePillarPath(tab: ServicePillarTab): string {
  return `/services/${tab}`;
}

export function getServicePillarTabMetadata(tab: ServicePillarTab): Metadata {
  const { title, description } = PILLAR_TAB_META[tab];

  return buildPageMetadata({
    path: servicePillarPath(tab),
    title: { absolute: title },
    description,
  });
}
