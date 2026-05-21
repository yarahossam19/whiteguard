import type { IndustryPageData } from "@/types/industry-page";
import raw from "./industrial-services.json";

export function getIndustrialServicesIndustryPageData(): IndustryPageData {
  return raw as IndustryPageData;
}
