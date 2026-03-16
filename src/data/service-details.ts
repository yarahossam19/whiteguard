import serviceDetails from "./service-details.json";

export type ServiceDetailData = (typeof serviceDetails)["penetration-testing"];

const data = serviceDetails as Record<string, ServiceDetailData>;

/** URL slugs that map to a service key (e.g. legacy URLs) */
const linkAliases: Record<string, string> = {
  "offensive-security": "penetration-testing",
  "cis-benchmarks": "cis-benchmarks-assessment",
};

export function getServiceDetailByLink(link: string): ServiceDetailData | null {
  const key = linkAliases[link] ?? link;
  return data[key] ?? null;
}
