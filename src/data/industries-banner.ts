import industriesBannerData from "./industries-banner.json";

export type IndustriesBannerData = typeof industriesBannerData;

export function getIndustriesBannerData(): IndustriesBannerData {
  return industriesBannerData;
}
