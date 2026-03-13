import serviceDetails from "./service-details.json";

export type ServiceDetailData = (typeof serviceDetails)["penetration-testing"];

const data = serviceDetails as Record<string, ServiceDetailData>;

/** Footer slugs that map to a card link */
const linkAliases: Record<string, string> = {
  "offensive-security": "penetration-testing",
};

export function getServiceDetailByLink(link: string): ServiceDetailData | null {
  const key = linkAliases[link] ?? link;
  return data[key] ?? null;
}
