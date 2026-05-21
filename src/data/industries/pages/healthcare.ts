import type { IndustryPageData } from "@/types/industry-page";
import raw from "./healthcare.json";

export function getHealthcareIndustryPageData(): IndustryPageData {
  return raw as unknown as IndustryPageData;
}
