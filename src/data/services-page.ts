import servicesPageData from "./services-page.json";

export type ServicesPageData = typeof servicesPageData;
export type ServiceCategory = keyof typeof servicesPageData.categories;
export type ServiceCard = (typeof servicesPageData.categories.offensive.cards)[number];

export function getServicesPageData(): ServicesPageData {
  return servicesPageData;
}
