import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { footerNav } from "@/config/site";

export async function generateStaticParams() {
  return footerNav.solutions.map((s) => ({
    slug: s.href.replace("/solutions/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = footerNav.solutions.find((s) => s.href.endsWith(slug));
  if (!item) return {};
  return {
    title: item.label,
    description: `Solutions for ${item.label}.`,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = footerNav.solutions.find((s) => s.href.endsWith(slug));
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">{item.label}</h1>
      <p className="mt-4 text-slate-600">Content coming soon...</p>
    </div>
  );
}
