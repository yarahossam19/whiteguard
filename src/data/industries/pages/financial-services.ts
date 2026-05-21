import type { IndustryPageData } from "@/types/industry-page";
import raw from "./financial-services.json";

export function getFinancialServicesIndustryPageData(): IndustryPageData {
  return raw as unknown as IndustryPageData;
}
