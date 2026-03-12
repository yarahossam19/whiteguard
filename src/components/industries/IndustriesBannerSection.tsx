"use client";

import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { IndustriesBannerData } from "@/data/industries-banner";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface IndustriesBannerSectionProps {
  data: IndustriesBannerData;
}

export default function IndustriesBannerSection({
  data,
}: IndustriesBannerSectionProps) {
  const { headline, description, ctas, videoSrc } = data;

  return (
    <>
      {" "}
      <section className="relative min-h-[90vh] w-full overflow-hidden">
        {/* Video background */}
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />

        {/* Dark overlay for text readability */}
        <div
          className="absolute h-[266px] w-full  bottom-0 left-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #ABE1FF 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-8 sm:py-20 lg:px-[7vw] lg:py-24">
          <div className="mx-auto flex max-w-[961px]   flex-col items-center gap-8">
            <h1
              className="font-jakarta font-extrabold leading-[1.2] tracking-[-0.02em] text-[#003859]"
              style={{ fontSize: "clamp(36px, 7vw, 72px)" }}
            >
              {headline.line1}
              <br />
              {headline.line2}
              &nbsp;
              {headline.line3}
            </h1>
            <p
              className="font-jakarta font-normal leading-[1.7] text-[#52697A]  "
              style={{ fontSize: "clamp(16px, 1.25vw, 20px)" }}
            >
              {description}
            </p>
          </div>
        </div>
      </section>{" "}
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave.mp4"
      />
    </>
  );
}
