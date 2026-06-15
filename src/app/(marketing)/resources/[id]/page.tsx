import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetailHero from "@/components/resources/ResourceDetailHero";
import ResourceDetailContent from "@/components/resources/ResourceDetailContent";
import ResourceDetailRelated from "@/components/resources/ResourceDetailRelated";
import { getResourceDetail } from "@/data/resource-details";
import { getResourcesData } from "@/data/resources";

export async function generateStaticParams() {
  const { items } = getResourcesData();
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const detail = getResourceDetail(id);
  if (!detail) return { title: "Resource | Whiteguard" };
  return {
    title: `${detail.title} | Whiteguard`,
    description: detail.sections[0]?.body?.slice(0, 160) ?? "Resource details",
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getResourceDetail(id);
  if (!detail) notFound();

  const resourcesData = getResourcesData();
  const relatedItems = resourcesData.items.filter((item) => item.id !== id);

  return (
    <div className="bg-white">
      <ResourceDetailHero image={detail.heroImage} alt={detail.title} />
      <ResourceDetailContent
        title={detail.title}
        toc={detail.toc}
        sections={detail.sections}
      />
      <ResourceDetailRelated items={relatedItems} />
    </div>
  );
}
