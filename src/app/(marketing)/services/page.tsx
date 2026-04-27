"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ServicesPageHero from "@/components/services/ServicesPageHero";
import ServicesPageTabs from "@/components/services/ServicesPageTabs";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesPageBottomCTA from "@/components/services/ServicesPageBottomCTA";
import { getServicesPageData } from "@/data/services-page";
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

function ServicesPageContent() {
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

  return (
    <div className="bg-white">
      {/* Sticky tabs - become sticky only when user scrolls past the hero */}
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

      {/* Service cards */}
      <section className="pb-24 xl:pb-40">
        <div className="container flex flex-col gap-16 xl:gap-[128px]">
          {cards.map((card) => (
            <ServiceCard key={card.link} card={card} />
          ))}
        </div>
      </section>

      <ServicesPageBottomCTA
        heading={bottomCta.heading}
        headingAccent={bottomCta.headingAccent}
        subtitle={bottomCta.subtitle}
        buttonLabel={bottomCta.buttonLabel}
        href={bottomCta.href}
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-[var(--primary-600)]">Loading...</div>
        </div>
      }
    >
      <ServicesPageContent />
    </Suspense>
  );
}
