import partnersLogosData from "./partners-logos.json";

export type PartnersLogoItem = (typeof partnersLogosData)[number];

export type PartnersLogosData = PartnersLogoItem[];

export function getPartnersLogosData(): PartnersLogosData {
  return partnersLogosData;
}
