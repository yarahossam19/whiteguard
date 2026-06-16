"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { WhiteHawkSectionData } from "@/data/white-hawk-section";
import { HoverSwapButton } from "../ui/HoverSwapButton";
import { SectionImageSeparator } from "../ui/SectionImageSeparator";

interface WhiteHawkSectionProps {
  data: WhiteHawkSectionData;
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
    >
      <path
        d="M0.713381 19.0329C0.919164 19.1564 1.15238 19.2113 1.38561 19.2113C1.61883 19.2113 1.87948 19.1427 2.08527 19.0192L15.8041 10.7879C16.2157 10.5409 16.4764 10.0882 16.4764 9.60806C16.4764 9.1279 16.2294 8.67518 15.8041 8.42824L2.08527 0.196925C1.8768 0.070479 1.63815 0.00248046 1.39435 6.65838e-05C1.15054 -0.0023473 0.910588 0.0609128 0.699662 0.183206C0.274378 0.430146 0 0.882868 0 1.37675V17.8394C0 18.3333 0.260659 18.786 0.699662 19.0329H0.713381Z"
        fill="#668399"
      />
    </svg>
  );
}

export default function WhiteHawkSection({ data }: WhiteHawkSectionProps) {
  const { heading, description, features, cta, dashboardImage } = data;
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {" "}
      <SectionImageSeparator direction="top" />
      <section
        className="relative w-full overflow-hidden py-20 xl:py-24"
        style={{
          background:
            "linear-gradient(180deg, #003859 0%, #001f33 20%, #001f33 80%, #003859 100%)",
        }}
      >
        <div className="container flex w-full flex-col-reverse items-center justify-between gap-16 xl:flex-row xl:gap-16">
          {/* Left: Content */}
          <div className="flex xl:max-w-[520px] flex-col gap-8">
            <div className="flex flex-col gap-4 items-center xl:items-start">
              <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] text-white">
                {heading.line1}
              </h2>
              <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
                <span className="text-white">{heading.line2} </span>
                <span className="text-[#0087D7]">{heading.line3}</span>
              </h2>
            </div>

            <p className="font-jakarta text-center xl:text-start text-base font-normal leading-[1.8] text-white">
              {description}
            </p>

            <ul className="flex flex-col   gap-4">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-jakarta text-sm leading-[1.5] text-white"
                >
                  <span
                    className="  flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(8, 145, 178, 0.2)",
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: "#0891b2" }}
                    />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div>
              <HoverSwapButton
                key={cta.href}
                href={cta.href}
                label={cta.label}
                hoverLabel={cta.hoverLabel}
                variant={cta.variant as "cta" | "secondary"}
                showChevrons={false}
                className="px-6 py-[14px] text-[clamp(14px,1.1vw,24px)]  font-ano w-full xl:w-auto"
              />

              <p
                className="font-jakarta text-xs font-normal leading-[1.75] mt-2"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {cta.disclaimer}
              </p>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="relative w-full xl:max-w-[544px] shrink-0 overflow-hidden rounded-lg">
            <div className="relative aspect-[544/356] w-full overflow-hidden rounded-lg">
              <Image
                src={dashboardImage}
                alt="White Hawk Platform dashboard"
                width={544}
                height={356}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 opacity-60 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, #003859 -36.18%, rgba(0, 0, 0, 0.00) 31.91%, rgba(0, 0, 0, 0.00) 100%)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className="relative z-10 flex cursor-pointer items-center justify-center rounded-full bg-white px-4 py-3.5 opacity-100 transition-all hover:scale-110 hover:bg-white/90"
                  aria-label="Play video"
                >
                  <PlayIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="absolute -top-10 right-0 text-white hover:text-red-500 hover:opacity-50 cursor-pointer"
              aria-label="Close video"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <video
              src={showVideo ? "/videos/whiehwk.mp4" : undefined}
              controls
              autoPlay
              preload="none"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
      <SectionImageSeparator direction="bottom" />
    </>
  );
}
