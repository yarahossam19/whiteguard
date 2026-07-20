import servicesPageData from "./services-page.json";
import type { ServicePillarTab } from "@/lib/services-pillar-tabs";
import { isServicePillarTab } from "@/lib/services-pillar-tabs";

export type ServicesPageData = typeof servicesPageData;
export type ServiceCategory = keyof typeof servicesPageData.categories;
export type ServiceCard = (typeof servicesPageData.categories.offensive.cards)[number];

export type ServiceCardEntry = {
  pillar: ServicePillarTab;
  link: string;
  card: ServiceCard;
};

export function getServicesPageData(): ServicesPageData {
  return servicesPageData;
}

const categoryKeysWithCards = [
  "offensive",
  "defensive",
  "grc",
  "training",
] as const satisfies readonly ServicePillarTab[];

export function getAllServiceCardEntries(): ServiceCardEntry[] {
  const entries: ServiceCardEntry[] = [];
  for (const pillar of categoryKeysWithCards) {
    const cat = servicesPageData.categories[pillar];
    if (cat && "cards" in cat) {
      for (const card of cat.cards as ServiceCard[]) {
        if (card.link) {
          entries.push({ pillar, link: card.link, card });
        }
      }
    }
  }
  return entries;
}

export function getAllServiceCardLinks(): string[] {
  return getAllServiceCardEntries().map((e) => e.link);
}

export function getServiceCardByLink(link: string): ServiceCard | null {
  return getAllServiceCardEntries().find((e) => e.link === link)?.card ?? null;
}

export function getServicePillarByLink(link: string): ServicePillarTab | null {
  return getAllServiceCardEntries().find((e) => e.link === link)?.pillar ?? null;
}

/** Nested detail path: `/services/offensive/penetration-testing`. */
export function getServiceDetailPath(link: string): string | null {
  const pillar = getServicePillarByLink(link);
  if (!pillar) return null;
  return `/services/${pillar}/${link}`;
}

export function isValidServicePillarSlug(
  pillar: string,
  slug: string,
): boolean {
  if (!isServicePillarTab(pillar)) return false;
  return getServicePillarByLink(slug) === pillar;
}
