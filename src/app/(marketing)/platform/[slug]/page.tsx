import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { footerNav } from "@/config/site";

export async function generateStaticParams() {
  return footerNav.platform.map((p) => ({
    slug: p.href.replace("/platform/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = footerNav.platform.find((p) => p.href.endsWith(slug));
  if (!item) return {};
  return {
    title: item.label,
    description: `Explore our ${item.label} platform.`,
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = footerNav.platform.find((p) => p.href.endsWith(slug));
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">{item.label}</h1>
      <p className="mt-4 text-slate-600">Content coming soon...</p>
    </div>
  );
}
