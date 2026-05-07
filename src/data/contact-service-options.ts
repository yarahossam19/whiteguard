import { getServicesPageData } from "./services-page";
import type { ServiceCard } from "./services-page";

export const CONTACT_SERVICE_CATEGORY_IDS = [
  "offensive",
  "defensive",
  "grc",
  "training",
] as const;

export type ContactServiceCategoryId =
  (typeof CONTACT_SERVICE_CATEGORY_IDS)[number];

export const CONTACT_SERVICE_TYPE_OTHER = "other" as const;

export type ContactServiceTypeChoiceId =
  | ContactServiceCategoryId
  | typeof CONTACT_SERVICE_TYPE_OTHER;

export function getContactServiceTypeOptions(): {
  id: ContactServiceTypeChoiceId;
  label: string;
}[] {
  const data = getServicesPageData();
  const fromTabs = CONTACT_SERVICE_CATEGORY_IDS.map((id) => {
    const tab = data.tabs.find((t) => t.id === id);
    return { id, label: tab?.label ?? id };
  });
  return [
    ...fromTabs,
    { id: CONTACT_SERVICE_TYPE_OTHER, label: "Other" },
  ];
}

export function getContactSubServiceOptions(
  categoryId: ContactServiceCategoryId,
): { value: string; label: string }[] {
  const data = getServicesPageData();
  const cat = data.categories[categoryId];
  if (!cat || !("cards" in cat)) return [];
  return (cat.cards as ServiceCard[]).map((c) => ({
    value: c.link,
    label: c.title,
  }));
}

export function isValidContactServiceSelection(
  serviceType: unknown,
  serviceSub: unknown,
): boolean {
  if (typeof serviceType !== "string") {
    return false;
  }
  const t = serviceType.trim();
  if (t === CONTACT_SERVICE_TYPE_OTHER) {
    if (serviceSub === undefined || serviceSub === null) {
      return true;
    }
    if (typeof serviceSub !== "string") {
      return false;
    }
    return serviceSub.trim() === "";
  }
  if (typeof serviceSub !== "string") {
    return false;
  }
  const s = serviceSub.trim();
  if (
    !CONTACT_SERVICE_CATEGORY_IDS.includes(t as ContactServiceCategoryId) ||
    s.length === 0
  ) {
    return false;
  }
  const opts = getContactSubServiceOptions(t as ContactServiceCategoryId);
  return opts.some((o) => o.value === s);
}

export function getContactServiceLabels(
  serviceType: string,
  serviceSub: string,
): { typeLabel: string; subLabel: string } {
  const data = getServicesPageData();
  const t = serviceType.trim();
  const s = serviceSub.trim();
  if (t === CONTACT_SERVICE_TYPE_OTHER) {
    return { typeLabel: "Other", subLabel: "—" };
  }
  const tab = data.tabs.find((x) => x.id === t);
  const typeLabel = tab?.label ?? t;
  let subLabel = s;
  if (
    CONTACT_SERVICE_CATEGORY_IDS.includes(t as ContactServiceCategoryId)
  ) {
    const cards = (
      data.categories[t as ContactServiceCategoryId] as { cards?: ServiceCard[] }
    ).cards;
    const card = cards?.find((c) => c.link === s);
    if (card) subLabel = card.title;
  }
  return { typeLabel, subLabel };
}
