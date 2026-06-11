"use client";

import { useState } from "react";
import type { PartnerProgramData } from "@/data/partner-program";
import { IconImage, partnerProgramIcons } from "./PartnerProgramIcons";

interface PartnerProgramAudienceSectionProps {
  data: PartnerProgramData["audience"];
}

const tabIcons = [
  partnerProgramIcons.consulting,
  partnerProgramIcons.mssp,
  partnerProgramIcons.integrators,
  partnerProgramIcons.channel,
];

export default function PartnerProgramAudienceSection({
  data,
}: PartnerProgramAudienceSectionProps) {
  const { title, subtitle, tabs } = data;
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const activeIconSrc =
    tabIcons[tabs.findIndex((t) => t.id === activeId)] ??
    partnerProgramIcons.consulting;

  return (
    <section className="border-t border-[#003859]/5 bg-white px-6 py-20 lg:py-24">
      <div className="container mx-auto max-w-[1200px]">
        <header className="mb-10 text-center">
          <h2 className="mb-4 font-jakarta text-[clamp(28px,4vw,36px)] font-extrabold text-[#003859]">
            {title}
          </h2>
          <p className="mx-auto max-w-[731px] font-jakarta text-lg leading-7 text-[#52697A]">
            {subtitle}
          </p>
        </header>

        <div
          className="mb-5 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Partner types"
        >
          {tabs.map((tab, index) => {
            const iconSrc = tabIcons[index] ?? partnerProgramIcons.consulting;
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3.5 font-jakarta text-base transition-colors ${
                  isActive
                    ? "border-[#003859] bg-[#003859] text-white"
                    : "border-[#e0e6eb] bg-white text-[#3d4f5c] hover:border-[#c2cdd6] hover:bg-[#f0f9ff]"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center ${
                    isActive ? "brightness-0 invert" : ""
                  }`}
                >
                  <IconImage src={iconSrc} size={16} />
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab && (
          <div
            role="tabpanel"
            className="mx-auto flex max-w-[896px] items-start gap-10 rounded-3xl border border-[#c2cdd6] bg-white p-12 shadow-[0_20px_25px_rgba(226,232,240,0.5)] max-md:flex-col max-md:gap-6 max-md:p-8"
          >
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#e7f6ff] text-[#003859]">
              <IconImage src={activeIconSrc} size={40} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-4 font-jakarta text-[clamp(22px,3vw,30px)] font-bold text-[#003859]">
                {activeTab.title}
              </h3>
              <p className="mb-4 max-w-[662px] font-jakarta text-lg leading-[1.625] text-[#52697A]">
                {activeTab.description}
              </p>
              <ul className="flex flex-col gap-3">
                {activeTab.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 font-jakarta text-base text-[#52697A]"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#02a1ff]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
