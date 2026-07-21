"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IndustriesBannerData } from "@/data/industries-banner";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface IndustriesBannerSectionProps {
  data: IndustriesBannerData;
}

const ICON_SIZE = 82;

type RotatingIcon = IndustriesBannerData["rotatingIcons"][number];

const slideTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

function IndustryIconSlide({ icons }: { icons: RotatingIcon[] }) {
  const [index, setIndex] = useState(0);
  const count = icons.length;

  useEffect(() => {
    if (count < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 3000);
    return () => clearInterval(interval);
  }, [count]);

  if (count === 0) return null;

  const icon = icons[index % count];

  return (
    <span
      className="mx-2  h-[82px] w-[82px] bg-[#E7F6FF] p-[10px] rounded-2xl hidden md:inline-block align-middle overflow-hidden"
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={icon.src}
          className="flex h-[62px] w-[62px] items-center justify-center"
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={slideTransition}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="h-[62px] w-[62px] object-contain"
          />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function IndustriesBannerSection({
  data,
}: IndustriesBannerSectionProps) {
  const { headline, description, videoSrc, rotatingIcons } = data;

  const icons = useMemo(() => rotatingIcons ?? [], [rotatingIcons]);

  return (
    <>
      <section className="relative min-h-[50vh] w-full overflow-hidden xl:min-h-[90vh]">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />

        <div
          className="absolute bottom-0 left-0 h-[266px] w-full"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #ABE1FF 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center py-16 text-center sm:py-20 xl:min-h-[60vh] xl:py-24">
          <div className="container flex flex-col items-center">
            <div className="mx-auto flex w-full max-w-[961px] flex-col items-center gap-8">
              <h1
                className="font-jakarta font-semibold leading-[1.2] tracking-[-0.02em] text-[#003859]"
                style={{ fontSize: "clamp(36px, 7vw, 72px)" }}
              >
                {headline.line1}
                <br />
                <div className="flex md:items-end md:gap-4 justify-center mt-2 flex-col md:flex-row items-center">
                  <span className="inline-block  md:block ">
                    {headline.line2}
                  </span>
                  <IndustryIconSlide icons={icons} />
                  <span className="inline-block  md:block ">
                    {headline.line3}
                  </span>
                </div>
              </h1>
              <p
                className="font-jakarta font-normal leading-[1.7] text-[#52697A]"
                style={{ fontSize: "clamp(16px, 1.25vw, 20px)" }}
              >
                {description}
              </p>
            </div>
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
