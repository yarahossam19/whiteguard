import partnerProgramData from "./partner-program.json";

export type PartnerProgramData = typeof partnerProgramData;

export function getPartnerProgramData(): PartnerProgramData {
  return partnerProgramData;
}
