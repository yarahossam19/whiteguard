import industriesProcessData from "./industries-process.json";

export type IndustriesProcessData = typeof industriesProcessData;

export function getIndustriesProcessData(): IndustriesProcessData {
  return industriesProcessData;
}
