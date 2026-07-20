"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ServicesPageData } from "@/data/services-page";
import {
  servicePillarPath,
  type ServicePillarTab,
} from "@/lib/services-pillar-tabs";

type TabId = ServicesPageData["tabs"][number]["id"];

interface ServicesPageTabsProps {
  tabs: ServicesPageData["tabs"];
  activeTab: TabId;
}

export default function ServicesPageTabs({
  tabs,
  activeTab,
}: ServicesPageTabsProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 800);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="container" aria-label="Service categories">
      <div
        className={`w-fit z-40 shadow-sm rounded-full max-w-full flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto  transition-all  duration-500 ease-in-out overflow-y-hidden overscroll-x-contain py-2.5 pl-3 pr-3 sm:gap-2 sm:px-4
      mx-auto  lg:flex  lg:max-w-none lg:items-center lg:justify-center lg:gap-1 lg:overflow-visible lg:px-6 lg:py-3
        ${
          isScrolled
            ? "relative bg-white/95 top-[23%] lg:mt-8 "
            : "relative bg-white/95 top-[23%] lg:mt-8 "
        } 
       `}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const href = servicePillarPath(tab.id as ServicePillarTab);

          return (
            <Link
              key={tab.id}
              href={href}
              scroll={false}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 cursor-pointer rounded-full font-jakarta font-normal transition-all duration-500 ease-in-out
              whitespace-nowrap px-1 py-2 text-[13px] leading-snug
              sm:px-3.5 sm:text-[14px]
              lg:px-4 lg:py-2 lg:text-[18px] lg:leading-[32.5px]
              xl:px-5 xl:text-[20px] w-auto
              ${isScrolled ? "lg:px-2! xl:px-1!" : ""}
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
