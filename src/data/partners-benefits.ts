import partnersBenefitsData from "./partners-benefits.json";

export type PartnersBenefitsData = typeof partnersBenefitsData;

export function getPartnersBenefitsData(): PartnersBenefitsData {
  return partnersBenefitsData;
}
