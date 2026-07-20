import ServiceCard from "@/components/services/ServiceCard";
import ServicesPageBottomCTA, {
  type BottomCtaHighlight,
} from "@/components/services/ServicesPageBottomCTA";
import ServicesPageFAQSection from "@/components/services/ServicesPageFAQSection";
import ServicesPageHero from "@/components/services/ServicesPageHero";
import ServicesPageTabs from "@/components/services/ServicesPageTabs";
import {
  getServicesPageData,
  type ServiceCard as ServiceCardType,
} from "@/data/services-page";
import { getServicesPageFaqForTab } from "@/data/services-page-faq";
import type { ServicePillarTab } from "@/lib/services-pillar-tabs";

interface ServicesPillarPageProps {
  activeTab: ServicePillarTab;
}

export default function ServicesPillarPage({ activeTab }: ServicesPillarPageProps) {
  const data = getServicesPageData();
  const category = data.categories[activeTab];
  const cards =
    category && "cards" in category
      ? (category.cards as ServiceCardType[])
      : [];
  const bottomCta =
    category && "bottomCta" in category
      ? category.bottomCta
      : data.categories.offensive.bottomCta;
  const faqData = getServicesPageFaqForTab(activeTab);

  return (
    <div className="bg-white">
      <ServicesPageTabs tabs={data.tabs} activeTab={activeTab} />
      <ServicesPageHero data={data} activeTab={activeTab} />

      <section className="pb-24 xl:pb-40">
        <div className="container flex flex-col gap-16 xl:gap-[128px]">
          {cards.map((card) => (
            <ServiceCard key={card.link} card={card} />
          ))}
        </div>
      </section>

      <ServicesPageFAQSection data={faqData} />

      <ServicesPageBottomCTA
        heading={bottomCta.heading}
        headingAccent={bottomCta.headingAccent}
        subtitle={bottomCta.subtitle}
        buttonLabel={bottomCta.buttonLabel}
        href={bottomCta.href}
        className="d-block w-full"
        highlights={
          "highlights" in bottomCta
            ? (bottomCta as { highlights?: BottomCtaHighlight[] }).highlights
            : undefined
        }
      />
    </div>
  );
}
