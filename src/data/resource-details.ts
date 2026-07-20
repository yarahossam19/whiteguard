import resourceDetailsData from "./resource-details.json";
import resourcesData from "./resources.json";

export type ResourceDetailData = (typeof resourceDetailsData)["1"];

const defaultDetail = (resourceDetailsData as Record<string, ResourceDetailData>)["1"];

export function getResourceDetail(id: string): ResourceDetailData | null {
  const data = resourceDetailsData as Record<string, ResourceDetailData>;
  const detail = data[id] ?? defaultDetail;
  if (!detail) return null;
  const listingItem = resourcesData.items.find((i) => i.id === id);
  const heroImage =
    listingItem?.image.startsWith("https://picsum.photos")
      ? listingItem.image.replace(/\/\d+\/\d+$/, "/1506/345")
      : detail.heroImage;
  return {
    ...detail,
    id,
    title: (data[id] && data[id].title) ? detail.title : (listingItem?.title ?? detail.title),
    heroImage,
  };
}
