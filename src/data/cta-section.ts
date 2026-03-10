import ctaSectionData from "./cta-section.json";

export type CtaSectionData = typeof ctaSectionData;

export function getCtaSectionData(): CtaSectionData {
  return ctaSectionData;
}
