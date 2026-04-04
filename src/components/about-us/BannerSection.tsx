"use client";

import Image from "next/image";
import Link from "next/link";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { AboutBannerData } from "@/data/about-banner";

interface BannerSectionProps {
  data: AboutBannerData;
}

function OutlineButton({
  href,
  label,
  showArrow = false,
}: {
  href: string;
  label: string;
  showArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-[12px] border border-[#9CA3AF] bg-white px-6 py-3.5 font-ano text-base font-normal text-[#002439] transition-colors hover:border-[#6B7280] hover:bg-gray-50"
    >
      {label}
      {showArrow && (
        <span className="text-[#002439]" aria-hidden>
          ↓
        </span>
      )}
    </Link>
  );
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
    stats,
    description,
    ctas,
    leftColumnImages,
    rightColumnImages,
    columnBackground,
  } = data;

  return (
    <section className="relative z-1 mb-20 w-full overflow-hidden flex flex-col-reverse">
      <div className="flex lg:min-h-screen flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT - Content  */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center  px-6 pt-24 sm:px-12 sm:py-16 lg:px-[7vw]  ">
          <div
            className="flex w-full  flex-col text-center lg:text-left"
            style={{ gap: 40 }}
          >
            {/* Heading */}
            <h1
              className="font-jakarta font-semibold leading-[86.4px] "
              style={{
                fontSize: "clamp(36px, 5vw, 58px)",
                color: "#003859",
              }}
            >
              {headline.line1}
              <br />
              {headline.line2}
            </h1>

            <div className="flex flex-col gap-8 lg:gap-[50px]">
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start lg:gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center gap-1"
                  >
                    <span
                      className="font-jakarta text-[clamp(22px,2.5vw,32px)] font-extrabold leading-tight"
                      style={{ color: "#003859" }}
                    >
                      {stat.value}
                    </span>
                    <span className="font-jakarta text-base font-medium leading-snug text-[#52697A">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p
                className="font-jakarta font-normal leading-[1.7] text-[#52697A]"
                style={{ fontSize: "clamp(16px, 1.25vw, 22px)" }}
              >
                {description}
              </p>
            </div>
            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {ctas.map((cta) =>
                cta.variant === "outline" ? (
                  <HoverSwapButton
                    key={cta.href}
                    href={cta.href}
                    label={cta.label}
                    hoverLabel={cta.hoverLabel}
                    variant="secondary"
                    showChevrons={false}
                    showArrow={"showArrow" in cta && cta.showArrow}
                    className="font-ano px-6 py-3.5 text-base lg:text-lg w-full md:w-auto"
                  />
                ) : (
                  <HoverSwapButton
                    key={cta.href}
                    href={cta.href}
                    label={cta.label}
                    hoverLabel={cta.hoverLabel}
                    variant="cta"
                    showChevrons={false}
                    className="font-ano px-6 py-3.5 text-base lg:text-lg w-full md:w-auto"
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* RIGHT - Image columns (hidden on mobile, shown below) */}
        <div className="relative hidden w-full lg:flex lg:w-1/2">
          <div
            className="flex absolute  w-full  left-[20%] -top-[50%]"
            style={{
              height: "1506px",
              transform: "rotate(-20.331deg)",
              alignItems: "flex-start",
              boxShadow:
                "-173px 78px 53px 0 rgba(0, 0, 0, 0.00), -110px 50px 49px 0 rgba(0, 0, 0, 0.01), -62px 28px 41px 0 rgba(0, 0, 0, 0.05), -28px 13px 30px 0 rgba(0, 0, 0, 0.09), -7px 3px 17px 0 rgba(0, 0, 0, 0.10)",
            }}
          >
            <div
              className="w-full z-20 h-[35%] absolute right-[30%] top-[-15%]  "
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
