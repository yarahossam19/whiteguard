import aboutMissionData from "./about-mission.json";

export type AboutMissionData = typeof aboutMissionData;

export function getAboutMissionData(): AboutMissionData {
  return aboutMissionData;
}
