import industriesSectionsData from "./industries-sections.json";

export type IndustriesSectionsData = typeof industriesSectionsData;

export function getIndustriesSectionsData(): IndustriesSectionsData {
  return industriesSectionsData;
}
