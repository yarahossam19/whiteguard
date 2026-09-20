import homeProcessData from "./home-process.json";

export type HomeProcessData = typeof homeProcessData;

export function getHomeProcessData(): HomeProcessData {
  return homeProcessData;
}
