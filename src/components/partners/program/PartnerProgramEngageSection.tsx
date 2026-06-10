"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import type { PartnerProgramData } from "@/data/partner-program";
import { IconImage, partnerProgramIcons } from "./PartnerProgramIcons";

interface PartnerProgramEngageSectionProps {
  data: PartnerProgramData["engage"];
}

const engageIcons = [
  partnerProgramIcons.sell,
  partnerProgramIcons.deliver,
  partnerProgramIcons.build,
];

const VH_PER_ITEM = 80;

export default function PartnerProgramEngageSection({
  data,
}: PartnerProgramEngageSectionProps) {
  const { title, subtitle, items } = data;
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const { scrollYProgress } = useScroll({
    target: scrollStageRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) return;
    const p = Math.max(0, Math.min(latest, 1));
    const segment = 1 / items.length;
    const index = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(p / segment)),
    );
    setActiveIndex(index);
  });

  const slideHeight = isMobile ? "min(60vh, 420px)" : "min(72vh, 520px)";
  const scrollStageHeight = prefersReducedMotion
    ? "auto"
    : `${items.length * VH_PER_ITEM}vh`;

  return (
    <section className="bg-[#e0e6eb]/25 px-6 py-20 lg:py-24">
      <div className="container mx-auto max-w-[1232px]">
        <header className="mb-16 text-center">
          <h2 className="mb-4 font-jakarta text-[clamp(28px,3.5vw,36px)] font-extrabold text-[#003859]">
            {title}
          </h2>
          <p className="mx-auto max-w-[632px] font-jakarta text-[clamp(17px,2vw,20px)] leading-7 text-[#52697A]">
            {subtitle}
          </p>
        </header>

        <div
          ref={scrollStageRef}
          className="relative w-full"
          style={{ minHeight: scrollStageHeight }}
        >
          <div
            className={
              prefersReducedMotion
                ? "relative"
                : "sticky top-0 flex min-h-screen items-center py-6 md:py-10"
            }
          >
            <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
              {/* Text slides */}
              <div
                className="w-full max-w-[496px] overflow-hidden"
                style={{
                  ["--slide-h" as string]: slideHeight,
                  height: prefersReducedMotion ? "auto" : "var(--slide-h)",
                }}
              >
                {prefersReducedMotion ? (
                  <div className="space-y-10">
                    {items.map((item, index) => {
                      const iconSrc =
                        engageIcons[index] ?? partnerProgramIcons.sell;
                      return (
                        <EngageTextBlock
                          key={item.id}
                          item={item}
                          iconSrc={iconSrc}
                          isActive
                          showBody
                          onSelect={() => setActiveIndex(index)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="flex flex-col transition-transform duration-[650ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
                    style={{
                      transform: `translateY(calc(-${activeIndex} * var(--slide-h)))`,
                    }}
                  >
                    {items.map((item, index) => {
                      const iconSrc =
                        engageIcons[index] ?? partnerProgramIcons.sell;
                      const isActive = index === activeIndex;
                      return (
                        <div
                          key={item.id}
                          className="flex shrink-0 items-center"
                          style={{ height: "var(--slide-h)" }}
                        >
                          <EngageTextBlock
                            item={item}
                            iconSrc={iconSrc}
                            isActive={isActive}
                            showBody={isActive}
                            onSelect={() => setActiveIndex(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Diagram */}
              <EngageDiagram activeIndex={activeIndex} itemCount={items.length} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EngageTextBlock({
  item,
  iconSrc,
  isActive,
  showBody,
  onSelect,
}: {
  item: PartnerProgramData["engage"]["items"][number];
  iconSrc: string;
  isActive: boolean;
  showBody: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left transition-opacity ${
        isActive ? "opacity-100" : "opacity-30 hover:opacity-60"
      }`}
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            isActive
              ? "bg-[#003859] text-white shadow-[0_0_12px_rgba(0,58,87,0.25)]"
              : "text-[#003859]"
          }`}
        >
          <span className={isActive ? "brightness-0 invert" : ""}>
            <IconImage src={iconSrc} size={24} />
          </span>
        </span>
        <span className="font-jakarta text-[clamp(24px,4vw,30px)] font-bold leading-9 text-[#003859]">
          {item.title}
        </span>
      </div>
      {showBody && (
        <p className="pl-16 font-jakarta text-lg leading-[29px] text-[#52697A] max-md:pl-0">
          {item.description}
        </p>
      )}
    </button>
  );
}

function EngageDiagram({
  activeIndex,
  itemCount,
}: {
  activeIndex: number;
  itemCount: number;
}) {
  const arcPaths = [
    "M 193 38 A 155 155 0 0 1 327.23 270.5",
    "M 327.23 270.5 A 155 155 0 0 1 58.77 270.5",
    "M 58.77 270.5 A 155 155 0 0 1 193 38",
  ].slice(0, itemCount);

  const nodes = [
    { cx: 193, cy: 38 },
    { cx: 327.23, cy: 270.5 },
    { cx: 58.77, cy: 270.5 },
  ].slice(0, itemCount);

  return (
    <div className="relative aspect-square w-full max-w-[387px] shrink-0">
      <svg viewBox="0 0 386 386" className="h-full w-full" aria-hidden>
        {arcPaths.map((d, i) => (
          <path
            key={`muted-${i}`}
            d={d}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-[#e0e6eb]"
          />
        ))}
        {arcPaths.map((d, i) => (
          <path
            key={`active-${i}`}
            d={d}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className="stroke-[#02a1ff] transition-all duration-700 motion-reduce:transition-none"
            strokeDasharray="324.6"
            strokeDashoffset={i <= activeIndex ? 0 : 324.6}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={`dot-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="11"
            className={
              i <= activeIndex ? "fill-[#02a1ff]" : "fill-[#859cad]"
            }
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[#e0e6eb] shadow-inner">
        <IconImage
          src={engageIcons[activeIndex] ?? partnerProgramIcons.sell}
          size={40}
        />
      </div>
    </div>
  );
}
