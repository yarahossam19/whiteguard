import aboutMilestonesData from "./about-milestones.json";

export type AboutMilestonesData = typeof aboutMilestonesData;

export function getAboutMilestonesData(): AboutMilestonesData {
  return aboutMilestonesData;
}
