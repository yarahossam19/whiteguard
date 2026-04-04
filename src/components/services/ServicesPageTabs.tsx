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
      className={`sticky z-40 top-[12%] w-full max-w-full transition-all duration-300 ease-in-out lg:top-[20vh] 2xl:top-[16vh] min-[1600px]:top-[14vh]! ${
        isScrolled ? "bg-white/10" : "bg-white/95"
      } shadow-sm
      flex flex-nowrap items-stretch justify-start gap-1.5 overflow-x-auto overflow-y-hidden overscroll-x-contain py-2.5 pl-3 pr-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      sm:gap-2 sm:px-4
      lg:mx-auto lg:w-fit lg:grid lg:max-w-none lg:grid-cols-5 lg:items-center lg:justify-center lg:gap-1 lg:overflow-visible lg:rounded-full lg:px-6 lg:py-3`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`shrink-0 cursor-pointer rounded-lg font-jakarta font-normal transition-all duration-500 ease-in-out
              whitespace-nowrap px-1 py-2 text-[13px] leading-snug
              sm:px-3.5 sm:text-[14px]
              lg:px-4 lg:py-2 lg:text-[18px] lg:leading-[32.5px]
              xl:px-5 xl:text-[20px]
              ${isScrolled ? "lg:px-2! xl:px-4!" : ""}
              ${
                isActive ? "text-white" : "text-[#52697A] hover:text-[#003859]"
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
