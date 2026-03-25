"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { PartnersGrowthData } from "@/data/partners-growth";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface PartnersGrowthSectionProps {
  data: PartnersGrowthData;
}

const DESKTOP_MAX_BAR = 145;

function barVisualStyle(color: "dark" | "light" | "gradient"): CSSProperties {
  if (color === "dark") return { backgroundColor: "#003859" };
  if (color === "gradient")
    return {
      background: "linear-gradient(180deg, #00A3E0 0%, #003859 100%)",
      boxShadow: "0 0 5.2px rgba(0, 135, 215, 0.4)",
    };
  return { backgroundColor: "#BAE6FD" };
}

/** Icon sits above the first dark bar; if none, first gradient; else column 0 */
function iconColumnIndex(bars: { color: string }[]): number {
  const dark = bars.findIndex((b) => b.color === "dark");
  if (dark >= 0) return dark;
  const grad = bars.findIndex((b) => b.color === "gradient");
  if (grad >= 0) return grad;
  return 0;
}

export default function PartnersGrowthSection({
  data,
}: PartnersGrowthSectionProps) {
  const { heading, subtitle, sectionTitle, growthIcon, items } = data;

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />
      <section
        className="relative w-full overflow-hidden [--chart-scale:0.285] md:[--chart-scale:0.633] lg:[--chart-scale:1]"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1328px] flex-col items-center px-5 py-[50px] md:px-11 md:py-16 lg:px-[7vw] lg:py-24">
          {/* Heading + Subtitle  */}
          <div className="mb-12 flex max-w-[353px] flex-col items-center gap-2 text-center md:mb-16 md:max-w-[746px] md:gap-4 lg:max-w-none">
            <h2 className="font-jakarta text-[32px] font-extrabold leading-[1.2] tracking-[-0.8px] text-[#003859] md:text-[40px] md:tracking-[-1.05px] lg:text-[42px]">
              <span className="whitespace-pre-wrap md:whitespace-normal">
                {heading.line1}
              </span>
              <span className="text-[#0087D7]">{heading.line2}</span>
            </h2>
            <p className="w-full font-jakarta text-[16px] font-normal leading-[1.5] text-[#52697A] md:max-w-[508px] md:text-[15px]">
              {subtitle}
            </p>
          </div>

          {/* Section title + icon */}
          <div className="mb-6 flex w-full max-w-[360px] items-center gap-2 self-start md:mb-10 md:max-w-none md:gap-2 lg:mb-16 lg:gap-4 lg:pl-1">
            <h3 className="font-jakarta text-[12px] font-extrabold leading-[1.2] text-[#003859] md:text-2xl lg:text-[32px]">
              {sectionTitle}
            </h3>
            <div className="relative size-4 shrink-0 md:size-7 lg:size-11">
              <Image
                src={growthIcon}
                alt=""
                fill
                className="object-contain"
                sizes="44px"
              />
            </div>
          </div>

          {/* Bar chart: icon above bars, labels below */}
          <div className="flex w-full max-w-[360px] items-stretch justify-between gap-0.5 md:max-w-[720px] md:gap-1 md:px-2 lg:max-w-[1200px] lg:gap-2 lg:px-0">
            {items.map((item, itemIdx) => {
              const chartColumnHeight = `calc(var(--chart-scale) * ${DESKTOP_MAX_BAR}px)`;
              const showGradientGlow =
                item.bars.some((b) => b.color === "gradient") && itemIdx === 3;
              const iconCol = iconColumnIndex(item.bars);
              const n = item.bars.length;
              const gridCols = `repeat(${n}, minmax(0, 1fr))`;

              return (
                <div
                  key={item.id}
                  className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col"
                >
                  <div
                    className="grid w-full gap-x-0.5 md:gap-x-1 lg:gap-x-2"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    {item.bars.map((_bar, i) => (
                      <div
                        key={`icon-${item.id}-${i}`}
                        className="flex min-h-[22px] items-end justify-center pb-0.5 md:min-h-[30px] md:pb-1 lg:min-h-[48px] lg:pb-1.5"
                      >
                        {i === iconCol && (
                          <div className="relative size-3 md:size-[27px] lg:size-[42px]">
                            <Image
                              src={item.icon}
                              alt=""
                              fill
                              className="object-contain"
                              sizes="42px"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {item.bars.map((bar, barIndex) => {
                      const h = `calc(var(--chart-scale) * ${bar.height}px)`;
                      const isGlowCell =
                        showGradientGlow &&
                        bar.color === "gradient" &&
                        barIndex === item.bars.length - 1;
                      return (
                        <div
                          key={`bar-${item.id}-${barIndex}`}
                          className="relative flex items-end"
                          style={{ height: chartColumnHeight }}
                        >
                          {isGlowCell && (
                            <div
                              className="pointer-events-none absolute left-1/2 top-[18%] z-0 -translate-x-1/2 rounded-full md:top-[15%] lg:top-[12%]"
                              style={{
                                width: "calc(var(--chart-scale) * 100px)",
                                height: "calc(var(--chart-scale) * 11px)",
                                background: "#0087d7",
                                filter: "blur(5.2px)",
                                opacity: 0.85,
                              }}
                              aria-hidden
                            />
                          )}
                          <div
                            className="relative z-10 w-full min-w-0 rounded-t-[3px] md:rounded-t-[6.33px] lg:rounded-t-[10px]"
                            style={{
                              height: h,
                              ...barVisualStyle(
                                bar.color as "dark" | "light" | "gradient",
                              ),
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="mt-2 grid w-full gap-x-0.5 md:mt-3 md:gap-x-1 lg:mt-4 lg:gap-x-2"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    {item.bars.map((_bar, i) => (
                      <div
                        key={`lbl-${item.id}-${i}`}
                        className="flex flex-col items-center"
                      >
                        {i === iconCol && (
                          <>
                            <div
                              className="w-px shrink-0 bg-[#003859] md:w-0.5"
                              style={{
                                height: "calc(var(--chart-scale) * 21px)",
                                minHeight: 5,
                              }}
                              aria-hidden
                            />
                            <p
                              className={`mt-1 px-0.5 text-center font-jakarta text-[8px] font-bold leading-[1.2] text-[#003859] md:mt-0.5 md:text-[9.5px] lg:mt-1 lg:text-[15px] ${
                                itemIdx === 0 || itemIdx === 1
                                  ? "max-w-[72px]"
                                  : ""
                              } ${itemIdx === 2 || itemIdx === 3 ? "max-w-[52px] md:max-w-none lg:max-w-[160px]" : ""}`}
                            >
                              {item.label}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave.mp4"
      />
    </>
  );
}
