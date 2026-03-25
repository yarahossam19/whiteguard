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

export default function ServicesSection({ data }: ServicesSectionProps) {
  const { heading, subtitle, services } = data;
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const p = Math.max(0, Math.min(latest, 1));
    const segment = 1 / N;
    const delay = segment * 0.4;
    const i = p < 1 ? Math.floor((p - delay) * N) : N - 1;
    setActiveIndex(Math.max(0, Math.min(i, N - 1)));
  });

  const segment = 1 / N;

  return (
    <section ref={ref} className="relative bg-white lg:mb-50">
      {/* Tall scroll area - each service gets 1/N of the scroll */}
      <div className="relative " style={{ height: `${N * 100}vh` }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 flex h-screen flex-col ">
          {/* Header - fixed at top of sticky area */}
          <div className="shrink-0 flex flex-col items-center gap-4 px-4 pt-0 sm:px-6 lg:px-[7vw] lg:pt-0">
            <div className="flex flex-col items-center gap-0 text-center ">
              <h2 className="font-jakarta text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.15] text-[#003859]">
                {heading.line1}
              </h2>
              <h2 className="font-jakarta text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.15] text-[#0087D7]">
                {heading.line2}
              </h2>
            </div>
            <p className="mt-4   text-center  font-jakarta text-base leading-[1.8] text-[#52697A]">
              {subtitle}
            </p>
          </div>

          {/* Card + background area - flex grow, center card vertically */}
          <div className="relative flex min-h-[400px] min-w-0 flex-1 items-center justify-center overflow-hidden px-4 sm:min-h-[577px] sm:px-6 lg:px-[7vw]">
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
            <div className="relative z-10 h-[340px] w-full max-w-[90%] shrink-0 translate-y-8 overflow-hidden self-center pt-12 sm:h-[420px] sm:max-w-[90%] sm:translate-y-12 sm:pt-16 lg:h-[577px] lg:max-w-[400px] lg:pt-20">
              {services.map((service, i) => {
                const slideFromBottom = 600;
                const isFirst = i === 0;
                const isLast = i === N - 1;

                const pad = 0.03;
                const inputRange = isLast
                  ? [0, (N - 1) * segment - 0.05, (N - 1) * segment + 0.1, 1]
                  : isFirst
                    ? [0, 0, segment + pad, 1]
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
                    ? [slideFromBottom, slideFromBottom, 0, 0]
                    : [slideFromBottom, slideFromBottom, 0, 0, 0];
                const opacityRange = isFirst
                  ? [1, 1, 1, 1]
                  : isLast
                    ? [0, 0, 1, 1]
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
        className="inline-flex flex-col items-start gap-4 p-6 sm:p-8 lg:gap-[15px] lg:px-10 lg:py-[60px]"
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
