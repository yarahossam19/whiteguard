import partnersHeroData from "./partners-hero.json";

export type PartnersHeroData = typeof partnersHeroData;

export function getPartnersHeroData(): PartnersHeroData {
  return partnersHeroData;
}
