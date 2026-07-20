import resourcesData from "./resources.json";

export interface ResourceListingItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface ResourcesData {
  hero: (typeof resourcesData)["hero"];
  listing: (typeof resourcesData)["listing"];
  items: ResourceListingItem[];
}

export function getResourcesData(): ResourcesData {
  return resourcesData as ResourcesData;
}
