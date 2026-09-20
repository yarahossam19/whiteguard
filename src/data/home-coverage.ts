import homeCoverageData from "./home-coverage.json";

export type HomeCoverageData = typeof homeCoverageData;

export function getHomeCoverageData(): HomeCoverageData {
  return homeCoverageData;
}
