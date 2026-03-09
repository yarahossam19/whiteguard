import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { footerNav } from "@/config/site";

export async function generateStaticParams() {
  return footerNav.services.map((s) => ({
    slug: s.href.replace("/services/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = footerNav.services.find((s) =>
    s.href.endsWith(slug)
  );
  if (!service) return {};
  return {
    title: service.label,
    description: `Learn about our ${service.label} services.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = footerNav.services.find((s) =>
    s.href.endsWith(slug)
  );
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">{service.label}</h1>
      <p className="mt-4 text-slate-600">Content coming soon...</p>
    </div>
  );
}
