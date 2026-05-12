"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import type { ServicesSectionData } from "@/data/services-section";

interface ServicesSectionProps {
  data: ServicesSectionData;
}

const N = 4; // number of services
/** More vh per card = slower scroll through each frame; last card has extra hold in inputRange below. */
const VH_PER_SERVICE = 130;
/**
 * Extra scroll length after animations — keeps sticky pinned so card 4 can be read before the next section.
 * Taller track also stretches earlier phases slightly (fractions unchanged).
 */
const SCROLL_TAIL_HOLD_VH = 240;

export default function ServicesSection({ data }: ServicesSectionProps) {
  const { heading, subtitle, services } = data;
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    // End marker later → more scroll usable while pinned before progress hits 1
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const p = Math.max(0, Math.min(latest, 1));
    /** Match keyed scroll phases below — not equal N segments */
    let i: number;
    if (p < 0.2) i = 0;
    else if (p < 0.42) i = 1;
    else if (p < 0.8) i = 2;
    else i = 3;
    setActiveIndex(i);
  });

  const segment = 1 / N;

  return (
    <section ref={ref} className="relative bg-white xl:mb-50">
      {/* Tall scroll area - each service gets 1/N of the scroll */}
      <div
        className="relative "
        style={{ height: `${N * VH_PER_SERVICE + SCROLL_TAIL_HOLD_VH}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 flex h-screen md:h-[70vh] xl:h-screen flex-col ">
          {/* Header - fixed at top of sticky area */}
          <div className="container shrink-0 flex flex-col items-center gap-4 pt-0 xl:pt-0">
            <div className="flex flex-col items-center gap-0 text-center ">
              <h2 className="font-jakarta text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.15] text-[#003859]">
                {heading.line1}
              </h2>
              <h2 className="font-jakarta text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.15] text-[#0891B2]">
                {heading.line2}
              </h2>
            </div>
            <p className="mt-4   text-center  font-jakarta text-base leading-[1.8] text-[#52697A]">
              {subtitle}
            </p>
          </div>

          {/* Card + background area - flex grow, center card vertically */}
          <div className="relative flex min-h-[400px] min-w-0 flex-1 items-center justify-center overflow-hidden xl:min-h-[577px]">
            {/* Background text - large, faded, marquee horizontal, behind card, never disappears */}
            <div
              className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0"
              aria-hidden
            >
              <div className="flex animate-services-marquee whitespace-nowrap items-center">
                {Array(12)
                  .fill(services[activeIndex].label)
                  .map((label, i) => (
                    <span
                      key={`${activeIndex}-${i}`}
                      className="mx-6 text-[clamp(120px,20vw,200px)] font-extrabold leading-none tracking-tighter"
                      style={{ color: "#e0e6eb" }}
                    >
                      {label}
                    </span>
                  ))}
              </div>
            </div>

            {/* Cards - swipe from behind (new card slides up and overlays previous) */}
            <div className="container relative z-10 flex justify-center px-0">
              <div className="relative z-10 h-[340px] w-full max-w-[90%] shrink-0 translate-y-8 overflow-hidden self-center pt-12 sm:h-[420px] sm:max-w-[90%] sm:translate-y-12 sm:pt-16 xl:h-[577px] xl:max-w-[400px] xl:pt-20">
                {services.map((service, i) => {
                  const slideFromBottom = 600;
                  const isFirst = i === 0;
                  const isLast = i === N - 1;
                  const isPenultimate = i === N - 2;

                  const pad = 0.03;
                  /**
                   * Last card: slide in, long plateau (readable), tiny tail → progress 1.
                   * Uses 5 stops so opacity/y stay flat across most of the tail scroll.
                   */
                  const inputRange =
                    isLast
                      ? [
                          0,
                          0.795,
                          0.852,
                          0.942,
                          1,
                        ]
                      : isFirst
                        ? [0, 0, segment + pad, 1]
                        : isPenultimate
                          ? [0, 0.46, 0.54, 0.79, 1]
                          : i === 1
                            ? [0, 0.22, 0.3, 0.46, 1]
                            : [
                                0,
                                i * segment,
                                (i + 1) * segment,
                                Math.min((i + 2) * segment, 1),
                                1,
                              ];
                  const yRange = isFirst
                    ? [0, 0, 0, 0]
                    : isLast
                      ? [slideFromBottom, slideFromBottom, 0, 0, 0]
                      : [slideFromBottom, slideFromBottom, 0, 0, 0];
                  const opacityRange = isFirst
                    ? [1, 1, 1, 1]
                    : isLast
                      ? [0, 0, 1, 1, 1]
                      : [0, 0, 1, 1, 1];

                  return (
                    <CardMotion
                      key={service.id}
                      service={service}
                      scrollYProgress={scrollYProgress}
                      inputRange={inputRange}
                      yRange={yRange}
                      opacityRange={opacityRange}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ServiceItem = ServicesSectionData["services"][number];

function CardMotion({
  service,
  scrollYProgress,
  inputRange,
  yRange,
  opacityRange,
}: {
  service: ServiceItem;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  inputRange: number[];
  yRange: number[];
  opacityRange: number[];
}) {
  const y = useTransform(scrollYProgress, inputRange, yRange);
  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);

  return (
    <motion.div className="absolute inset-0 w-full" style={{ y, opacity }}>
      <div
        className="inline-flex flex-col items-start gap-4 p-6 sm:p-8 xl:gap-[15px] xl:px-10 xl:py-[60px]"
        style={{
          borderRadius: "60.075px",
          border: `2.503px solid ${service.borderColor}`,
          borderColor: service.borderColor,
          background: " #FFF",
        }}
      >
        <div className="flex flex-col items-start" style={{ gap: "15.193px" }}>
          <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={service.icon}
              alt=""
              width={140}
              height={140}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-jakarta text-xl font-bold text-[#003859] sm:text-2xl">
              {service.title}
            </h2>
            <p className="mt-2 font-jakarta text-base font-normal leading-normal text-[#52697A] sm:mt-3 sm:text-lg">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
