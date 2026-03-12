import partnersTypesData from "./partners-types.json";

export type PartnersTypesData = typeof partnersTypesData;

export function getPartnersTypesData(): PartnersTypesData {
  return partnersTypesData;
}
