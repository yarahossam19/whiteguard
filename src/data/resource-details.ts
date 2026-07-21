import resourceDetailsData from "./resource-details.json";

export type ResourceDetailSection = {
  id: string;
  headline: string;
  body: string;
};

export type ResourceDetailData = {
  id: string;
  title: string;
  heroImage: string;
  sections: ResourceDetailSection[];
  toc: { id: string; label: string }[];
  /** ISO 8601 date — required for published articles / Article schema. */
  datePublished?: string;
  author?: string;
};

/** Placeholder resource IDs (Lorem ipsum) — served as 410 until real content ships. */
export const PLACEHOLDER_RESOURCE_IDS = new Set([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
]);

export function isPlaceholderResourceId(id: string): boolean {
  return PLACEHOLDER_RESOURCE_IDS.has(id);
}

/** IDs with real detail content that should be statically generated and indexed. */
export function getPublishedResourceIds(): string[] {
  const data = resourceDetailsData as Record<string, ResourceDetailData>;
  return Object.keys(data).filter((id) => !isPlaceholderResourceId(id));
}

export function getResourceDetail(id: string): ResourceDetailData | null {
  if (isPlaceholderResourceId(id)) return null;

  const data = resourceDetailsData as Record<string, ResourceDetailData>;
  return data[id] ?? null;
}
