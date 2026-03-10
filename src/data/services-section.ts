import servicesSectionData from "./services-section.json";

export type ServicesSectionData = typeof servicesSectionData;

export function getServicesSectionData(): ServicesSectionData {
  return servicesSectionData;
}
