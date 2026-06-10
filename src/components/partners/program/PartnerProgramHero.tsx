"use client";

import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { PartnerProgramData } from "@/data/partner-program";
import Image from "next/image";

interface PartnerProgramHeroProps {
  data: PartnerProgramData["hero"];
}

function HeroContentBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F5FBFF] to-[#E7F6FF]" />
      <div
        className="absolute left-1/2 top-[70%] h-[min(420px,50vh)] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-90"
        style={{
          backgroundImage: "url('/images/wave-light-blue-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-[#ABE0FF]/40 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0087D7 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  );
}

function PartnerHeroVisual({ dashboardSrc }: { dashboardSrc: string }) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[520px] items-center justify-center py-8 lg:max-w-none lg:py-0">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[min(320px,55%)] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0087D7]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[18%] left-1/2 h-28 w-[70%] -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 w-[92%] max-w-[460px]">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#002a45]/80 shadow-[0_28px_70px_rgba(0,0,0,0.38)] backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#06D6A0]/80" />
            </div>
            <span className="font-jakarta text-xs font-medium tracking-wide text-white/45">
              https://whitehawk.io
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={dashboardSrc}
              alt="WHITEGUARD partner platform dashboard"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 92vw, 460px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003859]/75 via-[#003859]/10 to-transparent" />
          </div>
        </div>

        <div className="absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2 sm:-bottom-4">
          <span className="font-jakarta text-[clamp(52px,9vw,80px)] font-extrabold leading-none tracking-[-0.04em] text-white drop-shadow-[0_0_48px_rgba(87,193,255,0.5)]">
            WH
          </span>
          <span className="mb-2 font-jakarta text-base font-semibold text-[#ABE0FF] sm:mb-3 sm:text-xl">
            Platform
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-[8%] top-[14%] hidden h-16 w-16 rounded-full border border-[#57C1FF]/25 lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[28%] left-[6%] hidden h-10 w-10 rounded-full border border-white/15 lg:block"
        aria-hidden
      />
    </div>
  );
}

export default function PartnerProgramHero({ data }: PartnerProgramHeroProps) {
  const { title, subtitle, cta, image } = data;
  const dashboardSrc = image ?? "/images/new-dashboard.avif";

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="flex min-h-[min(891px,92vh)] flex-col-reverse lg:flex-row">
        <div className="relative z-10 flex flex-1 items-center px-6 pb-16 pt-28 lg:px-10 lg:pb-24 lg:pt-36 xl:ps-[max(1.5rem,calc((100vw-1324px)/2+1.5rem))]">
          {/* <HeroContentBackground /> */}
          <div className="relative z-[2] max-w-[766px]">
            <h1 className="mb-6 flex flex-col gap-1 font-jakarta text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              <span className="text-[#003859]">{title[0]}</span>
              <span className="text-[#0087D7]">{title[1]}</span>
            </h1>
            <p className="mb-8 max-w-[599px] font-jakarta text-[clamp(15px,1.6vw,18px)] leading-[1.55] text-[#52697A]">
              {subtitle}
            </p>
            <HoverSwapButton
              href={cta.href}
              label={cta.label}
              hoverLabel={cta.hoverLabel}
              variant="secondary"
              showChevrons={false}
              className="min-w-[220px] px-6 py-3.5 text-lg font-ano"
            />
          </div>
        </div>

        <div
          className="relative flex w-full flex-1 items-center justify-center px-6 pb-10 pt-28 lg:min-h-full lg:px-10 lg:pb-0 lg:pt-36"
          style={{
            background:
              "linear-gradient(180deg, #003859 0%, #001f33 48%, #003859 100%)",
          }}
        >
          <PartnerHeroVisual dashboardSrc={dashboardSrc} />
        </div>
      </div>
    </section>
  );
}
