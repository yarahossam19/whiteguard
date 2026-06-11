"use client";

import { useState } from "react";
import type { PartnerProgramData } from "@/data/partner-program";
import { CheckIcon } from "./PartnerProgramIcons";

interface PartnerProgramCapabilitiesSectionProps {
  data: PartnerProgramData["capabilities"];
}

export default function PartnerProgramCapabilitiesSection({
  data,
}: PartnerProgramCapabilitiesSectionProps) {
  const { title, subtitle, items } = data;
  const [openId, setOpenId] = useState(items[items.length - 1]?.id ?? "");

  return (
    <section className="bg-white px-6 py-12 lg:py-20">
      <div className="container mx-auto max-w-[1312px]">
        <header className="mx-auto mb-12 max-w-[1232px] text-center">
          <h2 className="mb-4 font-jakarta text-[clamp(28px,3.5vw,36px)] font-extrabold text-[#003859]">
            {title}
          </h2>
          <p className="mx-auto max-w-[672px] font-jakarta text-xl leading-7 text-[#52697A]">
            {subtitle}
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const isOpen = item.id === openId;
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-[#02a1ff] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                    : "border-[#c2cdd6]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  aria-expanded={isOpen}
                  className={`flex min-h-24 w-full items-center justify-between gap-4 px-8 font-jakarta text-2xl font-bold transition-colors ${
                    isOpen ? "text-[#003859]" : "text-[#52697A] hover:text-[#003859]"
                  }`}
                >
                  <span className="text-left">{item.title}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-[#003859]" : "bg-[#c2cdd6]"
                    }`}
                  >
                    <span
                      className={`block h-2 w-2 border-b-2 border-r-2 transition-transform ${
                        isOpen
                          ? "translate-y-0 rotate-[225deg] border-white"
                          : "-translate-y-0.5 rotate-45 border-[#003859]"
                      }`}
                    />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`flex flex-wrap items-start gap-8 px-8 pb-7 transition-all duration-300 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-1.5 opacity-0"
                      }`}
                    >
                      <p className="max-w-[439px] flex-[280px] font-jakarta text-base leading-[26px] text-[#52697A]">
                        {item.description}
                      </p>
                      <ul className="flex min-w-[200px] flex-[240px] flex-col gap-3">
                        {item.pills.map((pill) => (
                          <li
                            key={pill}
                            className="flex min-h-8 items-center gap-2 rounded-[10px] bg-[#e7f6ff] px-3 py-1.5"
                          >
                            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#02a1ff]/45 bg-white/60 text-[#02a1ff]">
                              <CheckIcon />
                            </span>
                            <span className="font-jakarta text-sm text-[#003859]">
                              {pill}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
