import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { footerNav } from "@/config/site";
import {
  getAllServiceCardLinks,
  getServiceCardByLink,
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

/** All valid links: card links only (footer uses ?tab= query, not /services/[link]) */
function getAllValidLinks(): string[] {
  return getAllServiceCardLinks();
}

/** Allow any dynamic link - required for direct URL access */
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllValidLinks().map((link) => ({ link }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ link: string }>;
}): Promise<Metadata> {
  const { link } = await params;
  const detail = getServiceDetailByLink(link);
  const card = getServiceCardByLink(link);
  const service = footerNav.services.find((s) => s.href.endsWith(link));
  const title =
    (detail as { seo?: { title?: string } })?.seo?.title ??
    detail?.title ??
    card?.title ??
    service?.label ??
    "Service";
  const description =
    (detail as { seo?: { description?: string } })?.seo?.description ??
    detail?.hero?.subtitle ??
    `Learn about our ${card?.title ?? service?.label ?? "service"} services.`;
  return { title, description };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ link: string }>;
}) {
  const { link } = await params;
  const data = getServiceDetailByLink(link);
  const card = getServiceCardByLink(link);
  const service = footerNav.services.find((s) => s.href.endsWith(link));

  if (!data && !card && !service) notFound();

  if (!data) {
    const title = card?.title ?? service?.label ?? "Service";
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
