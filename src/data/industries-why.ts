import industriesWhyData from "./industries-why.json";

export type IndustriesWhyData = typeof industriesWhyData;

export function getIndustriesWhyData(): IndustriesWhyData {
  return industriesWhyData;
}
