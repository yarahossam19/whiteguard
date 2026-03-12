import partnersGrowthData from "./partners-growth.json";

export type PartnersGrowthData = typeof partnersGrowthData;

export function getPartnersGrowthData(): PartnersGrowthData {
  return partnersGrowthData;
}
