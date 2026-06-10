"use client";

import { useMemo, useState } from "react";
import type { PartnerProgramData } from "@/data/partner-program";
import { CheckIcon } from "./PartnerProgramIcons";

interface PartnerProgramTiersSectionProps {
  data: PartnerProgramData["tiers"];
}

export default function PartnerProgramTiersSection({
  data,
}: PartnerProgramTiersSectionProps) {
  const { title, subtitle, items } = data;

  const defaultIndex = useMemo(() => {
    const highlightedIndex = items.findIndex((tier) => tier.highlighted);
    if (highlightedIndex >= 0) return highlightedIndex;
    return Math.floor(items.length / 2);
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <section className="bg-[#e0e6eb]/25 px-6 py-20 lg:py-24">
      <div className="container mx-auto max-w-[1324px]">
        <header className="mx-auto mb-14 max-w-[1232px] text-center">
          <h2 className="mb-4 font-jakarta text-[clamp(28px,3.2vw,36px)] font-extrabold text-[#003859]">
            {title}
          </h2>
          <p className="mx-auto max-w-[632px] font-jakarta text-[clamp(17px,2vw,20px)] leading-7 text-[#4a5565]">
            {subtitle}
          </p>
        </header>

        <div
          className="flex flex-wrap items-center justify-center gap-8 max-md:flex-col max-md:items-stretch"
          onMouseLeave={() => setActiveIndex(defaultIndex)}
        >
          {items.map((tier, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={tier.id}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
                className={`box-border flex w-full max-w-[363px] min-h-[364px] flex-col rounded-2xl border-2 p-8 transition-[min-height,transform,border-color,background-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
                  isActive
                    ? "min-h-[382px] -translate-y-1.5 border-[#02a1ff] bg-white shadow-[0_20px_25px_rgba(0,0,0,0.1)] max-md:min-h-[364px] max-md:translate-y-0"
                    : "border-[#c2cdd6] bg-[#e0e6eb]/25 shadow-sm"
                }`}
              >
                <h3 className="mb-3 font-jakarta text-2xl font-bold text-[#003859]">
                  {tier.name}
                </h3>
                <p className="mb-6 font-jakarta text-sm text-[#52697A]">
                  {tier.tagline}
                </p>
                <ul className="flex flex-col gap-4">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-jakarta text-base leading-6 text-[#52697A]"
                    >
                      <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#52697a] text-white">
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
