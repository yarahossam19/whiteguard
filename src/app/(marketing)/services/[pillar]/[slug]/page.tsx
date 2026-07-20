import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { isServicePillarTab } from "@/lib/services-pillar-tabs";
import {
  getAllServiceCardEntries,
  getServiceCardByLink,
  getServiceDetailPath,
  isValidServicePillarSlug,
} from "@/data/services-page";
import { getServiceDetailByLink } from "@/data/service-details";
import ServiceDetailHero from "@/components/services-detail/ServiceDetailHero";
import ServiceDetailWhatIs from "@/components/services-detail/ServiceDetailWhatIs";
import ServiceDetailWhoNeeds from "@/components/services-detail/ServiceDetailWhoNeeds";
import ServiceDetailWhatWeTest from "@/components/services-detail/ServiceDetailWhatWeTest";
import ServiceDetailWhatYouReceive from "@/components/services-detail/ServiceDetailWhatYouReceive";
import ServiceDetailMethodology from "@/components/services-detail/ServiceDetailMethodology";
import ServiceDetailWhenToRun from "@/components/services-detail/ServiceDetailWhenToRun";
import ServiceDetailPricing from "@/components/services-detail/ServiceDetailPricing";
import ServiceDetailStandards from "@/components/services-detail/ServiceDetailStandards";
import ServiceDetailTestimonials from "@/components/services-detail/ServiceDetailTestimonials";
import ServiceDetailFAQs from "@/components/services-detail/ServiceDetailFAQs";
import ServiceDetailCTA from "@/components/services-detail/ServiceDetailCTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllServiceCardEntries().map(({ pillar, link }) => ({
    pillar,
    slug: link,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}): Promise<Metadata> {
  const { pillar, slug } = await params;

  if (!isValidServicePillarSlug(pillar, slug)) {
    return { title: "Service" };
  }

  const detail = getServiceDetailByLink(slug);
  const card = getServiceCardByLink(slug);
  const title =
    (detail as { seo?: { title?: string } } | null)?.seo?.title ??
    detail?.title ??
    card?.title ??
    "Service";
  const description =
    (detail as { seo?: { description?: string } } | null)?.seo?.description ??
    detail?.hero?.subtitle ??
    `Learn about our ${card?.title ?? "service"} services.`;

  return buildPageMetadata({
    path: getServiceDetailPath(slug) ?? `/services/${pillar}/${slug}`,
    title,
    description,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar, slug } = await params;

  if (!isServicePillarTab(pillar) || !isValidServicePillarSlug(pillar, slug)) {
    notFound();
  }

  const data = getServiceDetailByLink(slug);
  const card = getServiceCardByLink(slug);

  if (!data && !card) notFound();

  if (!data) {
    const title = card?.title ?? "Service";
    return (
      <div className="container py-16">
        <h1 className="font-jakarta text-3xl font-bold text-[#003859]">
          {title}
        </h1>
        <p className="mt-4 font-jakarta text-[#52697a]">
          Content coming soon. We&apos;ll add the full service detail page
          shortly.
        </p>
      </div>
    );
  }

  const {
    hero,
    whatIs,
    whoNeeds,
    whatWeTest,
    whatYouReceive,
    methodology,
    whenToRun,
    pricing,
    standards,
    testimonials,
    faqs,
    cta,
  } = data;

  return (
    <div className="flex flex-col">
      <ServiceDetailHero
        headline={hero.headline}
        subtitle={hero.subtitle}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />
      <ServiceDetailWhatIs
        heading={whatIs.heading}
        body={whatIs.body}
        ctaLabel={whatIs.ctaLabel}
        ctaHref={whatIs.ctaHref}
      />
      <ServiceDetailWhoNeeds
        heading={whoNeeds.heading}
        subtitle={whoNeeds.subtitle}
        cards={whoNeeds.cards}
        examples={whoNeeds.examples}
      />
      <ServiceDetailWhatWeTest
        heading={whatWeTest.heading}
        subtitle={whatWeTest.subtitle}
        items={whatWeTest.items}
      />
      <ServiceDetailWhatYouReceive
        heading={whatYouReceive.heading}
        subtitle={whatYouReceive.subtitle}
        items={whatYouReceive.items}
        linkLabel={whatYouReceive.linkLabel}
        linkHref={whatYouReceive.linkHref}
      />
      <ServiceDetailMethodology
        heading={methodology.heading}
        subtitle={methodology.subtitle}
        steps={methodology.steps}
      />
      <ServiceDetailWhenToRun
        heading={whenToRun.heading}
        items={whenToRun.items}
      />
      <ServiceDetailPricing
        heading={pricing.heading}
        subtitle={pricing.subtitle}
        plans={pricing.plans}
        ctaLabel={pricing.ctaLabel}
        ctaHref={pricing.ctaHref}
      />
      <ServiceDetailStandards
        heading={standards.heading}
        cards={standards.cards}
        certifications={standards.certifications}
      />
      <ServiceDetailTestimonials testimonials={testimonials} />
      <ServiceDetailFAQs faqs={faqs} />
      <ServiceDetailCTA
        heading={cta.heading}
        subtitle={cta.subtitle}
        buttonLabel={cta.buttonLabel}
        buttonHref={cta.buttonHref}
      />
    </div>
  );
}
