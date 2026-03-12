import partnersHowItWorksData from "./partners-how-it-works.json";

export type PartnersHowItWorksData = typeof partnersHowItWorksData;

export function getPartnersHowItWorksData(): PartnersHowItWorksData {
  return partnersHowItWorksData;
}
