import partnersCtaData from "./partners-cta.json";

export type PartnersCtaData = typeof partnersCtaData;

export function getPartnersCtaData(): PartnersCtaData {
  return partnersCtaData;
}
