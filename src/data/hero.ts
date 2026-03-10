import heroData from "./hero.json";

export type HeroData = typeof heroData;

export function getHeroData(): HeroData {
  return heroData;
}
