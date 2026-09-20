import certificationsSectionData from "./certifications-section.json";

export type CertificationsSectionData = typeof certificationsSectionData;

export function getCertificationsSectionData(): CertificationsSectionData {
  return certificationsSectionData;
}
