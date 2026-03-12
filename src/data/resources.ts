import resourcesData from "./resources.json";

export type ResourcesData = typeof resourcesData;

export function getResourcesData(): ResourcesData {
  return resourcesData;
}
