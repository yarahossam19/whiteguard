"use client";

import type { ServicesPageData } from "@/data/services-page";

type TabId = ServicesPageData["tabs"][number]["id"];

interface ServicesPageTabsProps {
  tabs: ServicesPageData["tabs"];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function ServicesPageTabs({
  tabs,
  activeTab,
  onTabChange,
}: ServicesPageTabsProps) {
  return (
    <div className="sticky top-[20vh] w-[55%] max-w-[90%] mx-auto z-40 flex flex-wrap items-center justify-between gap-0   bg-white/95 px-2 py-4 shadow-sm  lg:px-4 lg:py-3 rounded-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`cursor-pointer font-jakarta text-[18px] leading-[32.5px] px-4 py-2.5 rounded-lg transition-colors lg:px-6 lg:py-2 lg:text-[20px] ${
              isActive
                ? "font-normal text-white"
                : "font-normal text-[#52697A] hover:text-[#003859]"
            }`}
            style={{
              borderRadius: isActive ? "12px" : "0px",
              border: isActive ? "1px solid #0087D7" : "none",
              background: isActive
                ? "linear-gradient(180deg, var(--Primary-800, #003859) 0%, var(--Primary-600, #006DAD) 100%)"
                : "transparent",
              boxShadow: isActive
                ? " 0 1px 18px 2px #D2EAFF inset, 0 1px 4px 2px #D2EAFF inset, 0 42px 107px 0 rgba(87, 177, 255, 0.34), 0 24.721px 32.257px 0 rgba(87, 177, 255, 0.19), 0 10.268px 13.398px 0 rgba(87, 177, 255, 0.22), 0 3.714px 4.846px 0 rgba(87, 177, 255, 0.15), 0 0 0 4px #E0E9F2, 0 0 0 5px #FFF"
                : "none",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
