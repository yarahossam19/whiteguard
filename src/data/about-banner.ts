import aboutBannerData from "./about-banner.json";

export type AboutBannerData = typeof aboutBannerData;

export function getAboutBannerData(): AboutBannerData {
  return aboutBannerData;
}
