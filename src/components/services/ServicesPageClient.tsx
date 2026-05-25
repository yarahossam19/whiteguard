"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ServicesPageHero from "@/components/services/ServicesPageHero";
import ServicesPageTabs from "@/components/services/ServicesPageTabs";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesPageFAQSection from "@/components/services/ServicesPageFAQSection";
import ServicesPageBottomCTA, {
  type BottomCtaHighlight,
} from "@/components/services/ServicesPageBottomCTA";
import { getServicesPageData } from "@/data/services-page";
import { getServicesPageFaqForTab } from "@/data/services-page-faq";
import type { ServiceCard as ServiceCardType } from "@/data/services-page";

const VALID_TABS = [
  "all",
  "offensive",
  "defensive",
  "grc",
  "training",
] as const;
type TabId = (typeof VALID_TABS)[number];

function isValidTab(tab: string | null): tab is TabId {
  return tab !== null && VALID_TABS.includes(tab as TabId);
}

function ServicesPageInner() {
  const data = getServicesPageData();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<TabId>("offensive");

  useEffect(() => {
    if (isValidTab(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const { cards, bottomCta } = useMemo(() => {
    if (activeTab === "all") {
      const allCards: ServiceCardType[] = [];
      const categories = ["offensive", "defensive", "grc", "training"] as const;
      for (const cat of categories) {
        const c = data.categories[cat];
        if (c && "cards" in c) {
          allCards.push(...(c.cards as ServiceCardType[]));
        }
      }
      return {
        cards: allCards,
        bottomCta: data.categories.all.bottomCta,
      };
    }
    const cat = data.categories[activeTab];
    if (!cat || !("cards" in cat)) {
      return { cards: [], bottomCta: data.categories.offensive.bottomCta };
    }
    return {
      cards: cat.cards as ServiceCardType[],
      bottomCta: cat.bottomCta,
    };
  }, [activeTab, data]);

  const faqData = getServicesPageFaqForTab(activeTab);

  return (
    <div className="bg-white">
      <ServicesPageTabs
        tabs={data.tabs}
        activeTab={activeTab}
        onTabChange={(tab) => {
          const tabId = tab as TabId;
          setActiveTab(tabId);
          const params = new URLSearchParams(searchParams.toString());
          if (tabId === "all") {
            params.delete("tab");
          } else {
            params.set("tab", tabId);
          }
          const query = params.toString();
          router.push(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <ServicesPageHero data={data} activeTab={activeTab} />

      <section className="pb-24 xl:pb-40">
        <div className="container flex flex-col gap-16 xl:gap-[128px]">
          {cards.map((card) => (
            <ServiceCard key={card.link} card={card} />
          ))}
        </div>
      </section>

      <ServicesPageFAQSection key={activeTab} data={faqData} />

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

export default function ServicesPageClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center bg-white">
          <div className="animate-pulse text-primary-600">Loading...</div>
        </div>
      }
    >
      <ServicesPageInner />
    </Suspense>
  );
}
