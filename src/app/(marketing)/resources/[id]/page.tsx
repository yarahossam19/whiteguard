import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetailHero from "@/components/resources/ResourceDetailHero";
import ResourceDetailContent from "@/components/resources/ResourceDetailContent";
import ResourceDetailRelated from "@/components/resources/ResourceDetailRelated";
import {
  getPublishedResourceIds,
  getResourceDetail,
  isPlaceholderResourceId,
} from "@/data/resource-details";
import { getResourcesData } from "@/data/resources";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  toSchemaGraph,
} from "@/lib/schema";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublishedResourceIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  if (isPlaceholderResourceId(id)) {
    return buildPageMetadata({
      path: `/resources/${id}`,
      title: "Resource | WhiteGuard",
      robots: { index: false, follow: false },
    });
  }

  const detail = getResourceDetail(id);
  if (!detail) {
    return buildPageMetadata({
      path: `/resources/${id}`,
      title: "Resource | WhiteGuard",
      robots: { index: false, follow: false },
    });
  }

  return buildPageMetadata({
    path: `/resources/${id}`,
    title: `${detail.title} | WhiteGuard`,
    description: detail.sections[0]?.body?.slice(0, 160) ?? "Resource details",
  });
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (isPlaceholderResourceId(id)) {
    notFound();
  }

  const detail = getResourceDetail(id);
  if (!detail) notFound();

  const resourcesData = getResourcesData();
  const relatedItems = resourcesData.items.filter((item) => item.id !== id);

  const articleDescription =
    detail.sections[0]?.body?.slice(0, 160) ?? "Resource details";
  const datePublished = detail.datePublished ?? "2026-01-01";
  const authorName = detail.author ?? "WhiteGuard";

  const structuredData = toSchemaGraph(
    buildArticleSchema({
      title: detail.title,
      description: articleDescription,
      path: `/resources/${id}`,
      image: detail.heroImage,
      datePublished,
      authorName,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Resources", path: "/resources" },
      { name: detail.title, path: `/resources/${id}` },
    ]),
  );

  return (
    <div className="bg-white">
      <JsonLd data={structuredData} />
      {/* <ResourceDetailHero image={detail.heroImage} alt={detail.title} /> */}
      <ResourceDetailContent
        image={detail.heroImage}
        alt={detail.title}
        title={detail.title}
        toc={detail.toc}
        sections={detail.sections}
      />
      <ResourceDetailRelated items={relatedItems} />
    </div>
  );
}
