import servicesPageData from "./services-page.json";

export type ServicesPageData = typeof servicesPageData;
export type ServiceCategory = keyof typeof servicesPageData.categories;
export type ServiceCard = (typeof servicesPageData.categories.offensive.cards)[number];

export function getServicesPageData(): ServicesPageData {
  return servicesPageData;
}

const categoryKeysWithCards = ["offensive", "defensive", "grc", "training"] as const;

export function getAllServiceCardLinks(): string[] {
  const links: string[] = [];
  for (const key of categoryKeysWithCards) {
    const cat = servicesPageData.categories[key];
    if (cat && "cards" in cat) {
      for (const card of cat.cards as ServiceCard[]) {
        if (card.link) links.push(card.link);
      }
    }
  }
  return links;
}

export function getServiceCardByLink(link: string): ServiceCard | null {
  for (const key of categoryKeysWithCards) {
    const cat = servicesPageData.categories[key];
    if (cat && "cards" in cat) {
      const found = (cat.cards as ServiceCard[]).find((c) => c.link === link);
      if (found) return found;
    }
  }
  return null;
}
