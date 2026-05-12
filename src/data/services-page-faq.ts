import servicesPageFaqData from "./services-page-faq.json";

/** FAQ sets keyed like services tabs: `all`, `offensive`, `defensive`, `grc`, `training` */
export type ServicesFaqByTab = typeof servicesPageFaqData;

export type ServicesPageFaqSectionData =
  ServicesFaqByTab[keyof ServicesFaqByTab];

const TAB_IDS = ["all", "offensive", "defensive", "grc", "training"] as const;

export type ServicesFaqTabId = (typeof TAB_IDS)[number];

export function isServicesFaqTabId(tab: string): tab is ServicesFaqTabId {
  return TAB_IDS.includes(tab as ServicesFaqTabId);
}

export function getServicesFaqByTab(): ServicesFaqByTab {
  return servicesPageFaqData;
}

export function getServicesPageFaqForTab<K extends keyof ServicesFaqByTab>(
  tab: K,
): ServicesFaqByTab[K] {
  return servicesPageFaqData[tab];
}
