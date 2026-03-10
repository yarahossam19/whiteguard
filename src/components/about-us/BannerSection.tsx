"use client";

import Image from "next/image";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { AboutBannerData } from "@/data/about-banner";

interface BannerSectionProps {
  data: AboutBannerData;
}

function ImageColumn({
  images,
  direction,
  className = "",
}: {
  images: string[];
  direction: "up" | "down";
  className?: string;
}) {
  const animationClass =
    direction === "up" ? "animate-marquee-up" : "animate-marquee-down";

  return (
    <div
      className={`relative h-full min-h-screen w-full overflow-hidden ${className}`}
    >
      <div className={`flex flex-col gap-0 ${animationClass}`}>
        {/* Duplicate for seamless loop */}
        {[1, 2].map((set) => (
          <div key={set} className="flex flex-col gap-0">
            {images.map((src, i) => (
              <div
                key={`${set}-${i}`}
                className="relative h-full w-full shrink-0 overflow-hidden  "
                style={{
                  aspectRatio: "1/1",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BannerSection({ data }: BannerSectionProps) {
  const {
    headline,
    description,
    ctas,
    decorations,
    leftColumnImages,
    rightColumnImages,
    columnBackground,
  } = data;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="flex min-h-screen flex-col lg:flex-row overflow-hidden relative  ">
        {/*  Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14 sm:px-12 sm:py-16 lg:px-[7vw] lg:py-0">
          <img
            src={decorations.sparkleTop}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[12%] top-[18%] hidden h-[68px] w-[65px] select-none object-contain lg:block"
          />

          <div
            className="flex w-full max-w-[560px] flex-col text-center lg:text-left"
            style={{ gap: 40 }}
          >
            <div className="flex flex-col" style={{ gap: 24 }}>
              <h1
                className="font-jakarta font-extrabold leading-[1.18] tracking-[-0.03em]"
                style={{ fontSize: "clamp(36px, 5vw, 58px)" }}
              >
                <span className="text-[#003859]">{headline.line1.bold}</span>
                <span className="font-light text-[#0087D7]">
                  {headline.line1.light}
                </span>
                <span className="text-[#003859]">{headline.line1.end}</span>
                <br />
                <span className="text-[#003859]">{headline.line2.bold}</span>
                <span className="inline-flex items-baseline gap-0">
                  <span className="font-light text-[#0087D7]">
                    {headline.line2.light}
                  </span>
                  <span className="text-[#003859]">{headline.line2.end}</span>
                  <img
                    src={decorations.sparkleBottom}
                    alt=""
                    aria-hidden
                    className="ms-2 hidden h-[70px] w-[65px] shrink-0 select-none object-contain lg:block"
                  />
                </span>
              </h1>
              <p
                className="font-jakarta font-normal leading-[1.7] text-[#52697A]"
                style={{ fontSize: "clamp(16px, 1.25vw, 20px)" }}
              >
                {description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {ctas.map((cta) => (
                <HoverSwapButton
                  key={cta.href}
                  href={cta.href}
                  label={cta.label}
                  hoverLabel={cta.hoverLabel}
                  variant={cta.variant as "cta" | "secondary"}
                  showChevrons={false}
                  className="font-ano px-6 py-3.5 text-base lg:text-lg"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex relative  w-1/2">
          <div
            className="flex absolute  w-full  left-[30%] -top-[50%]"
            style={{
              height: "1506px",
              transform: "rotate(-20.331deg)",
              alignItems: "flex-start",
              boxShadow:
                "-173px 78px 53px 0 rgba(0, 0, 0, 0.00), -110px 50px 49px 0 rgba(0, 0, 0, 0.01), -62px 28px 41px 0 rgba(0, 0, 0, 0.05), -28px 13px 30px 0 rgba(0, 0, 0, 0.09), -7px 3px 17px 0 rgba(0, 0, 0, 0.10)",
            }}
          >
            <div
              className="w-full z-20 h-[50%] absolute right-[30%] top-[-15%]  "
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255, 255, 255,1) ,rgba(255, 255, 255,1), transparent)",
                backdropFilter: "blur(1px)",
                transform: "rotate(-0.331deg)",
              }}
            />
            <div
              className="w-[5%] h-full bg-[#81D0FF]"
              style={{
                backgroundImage: `url(${columnBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* LEFT COLUMN - Images scroll bottom to top */}
            <div className="relative hidden min-h-screen w-[47.5%] shrink-0 lg:block">
              <ImageColumn
                images={leftColumnImages}
                direction="up"
                className="h-full min-h-screen"
              />
            </div>
            {/* RIGHT COLUMN - Images scroll top to bottom */}
            <div className="relative hidden min-h-screen w-[47.5%] shrink-0 lg:block">
              <ImageColumn
                images={rightColumnImages}
                direction="down"
                className="h-full min-h-screen"
              />
            </div>
          </div>
          <div
            className="w-full z-20 h-[50%] absolute left-[30%] bottom-[-20%]  "
            style={{
              background:
                "linear-gradient(to top, rgba(255, 255, 255,1) ,rgba(255, 255, 255,1), transparent)",
              backdropFilter: "blur(1.2px)",
              transform: "rotate(-20.331deg)",
            }}
          />
        </div>
      </div>

      {/* Mobile: show single column with up scroll */}
      <div className="relative h-[400px] overflow-hidden lg:hidden">
        <ImageColumn
          images={leftColumnImages}
          direction="up"
          className="min-h-0! h-full!"
        />
      </div>
    </section>
  );
}
