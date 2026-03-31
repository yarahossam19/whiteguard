"use client";

import { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky  z-40 mx-auto  grid grid-cols-5 px-6 w-fit items-center justify-center gap-1 py-3 shadow-sm     sm:justify-between lg:rounded-full  not-even:gap-2  lg:py-3 top-[10%] lg:top-[20vh] 2xl:top-[16vh] min-[1600px]:top-[14vh]! transition-all duration-300 ease-in-out     ${
        isScrolled ? "bg-white/10 " : "bg-white/95  "
      }`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`cursor-pointer transition-all duration-500 ease-in-out font-jakarta text-[18px] leading-[32.5px] ${isScrolled ? "lg:px-2!" : "lg:px-6"} py-2.5 rounded-lg    lg:py-2 lg:text-[20px] ${
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
