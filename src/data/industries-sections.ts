import industriesSectionsData from "./industries-sections.json";

export type IndustriesSectionsData = typeof industriesSectionsData;

/** Single industry row from `industries-sections.json` (listing / hub page only) */
export type IndustrySection = IndustriesSectionsData["industries"][number];

export function getIndustriesSectionsData(): IndustriesSectionsData {
  return industriesSectionsData;
}

