import aboutTeamData from "./about-team.json";

export type AboutTeamData = typeof aboutTeamData;

export function getAboutTeamData(): AboutTeamData {
  return aboutTeamData;
}
