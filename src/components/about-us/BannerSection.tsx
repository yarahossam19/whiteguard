"use client";

import Image from "next/image";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { AboutBannerData } from "@/data/about-banner";

interface BannerSectionProps {
  data: AboutBannerData;
}

const ORBIT_POSITIONS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1",
  "bottom-2 left-0",
  "bottom-2 right-0",
] as const;

function OrbitStatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/90 bg-white/95 px-4 py-3 text-center shadow-[0_16px_40px_rgba(0,56,89,0.12)] backdrop-blur-sm sm:px-5 sm:py-4">
      <p className="font-jakarta text-[clamp(22px,5vw,32px)] font-extrabold leading-none text-[#0087D7]">
        {value}
      </p>
      <p className="mt-1.5 font-jakarta text-xs font-medium leading-snug text-[#52697A] sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function LogoOrbitVisual({ stats }: { stats: AboutBannerData["stats"] }) {
  return (
    <div className="relative mx-auto h-[min(72vw,280px)] w-full max-w-[280px] sm:h-[300px] sm:max-w-[320px] lg:h-[430px] lg:max-w-[450px]">
      <div
        className="absolute inset-[2%] overflow-hidden rounded-full border border-[#0087D7]/10 motion-reduce:overflow-visible"
        aria-hidden
      >
        <div
          className="absolute inset-[-50%] animate-banner-radar-sweep motion-reduce:animate-none"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(2,161,255,0.08) 320deg, rgba(0,135,215,0.28) 360deg)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-[2%] rounded-full border border-[#02a1ff]/25 animate-banner-radar-pulse motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[2%] rounded-full border border-[#0087D7]/20 animate-banner-radar-pulse motion-reduce:animate-none [animation-delay:1.6s]"
        aria-hidden
      />

      <div
        className="absolute inset-[12%] rounded-full border border-dashed border-[#0087D7]/18 motion-reduce:animate-none animate-banner-orbit-spin"
        aria-hidden
      />
      <div
        className="absolute inset-[22%] rounded-full bg-linear-to-br from-[#E7F6FF] via-white to-[#ABE0FF]/50 shadow-[inset_0_0_40px_rgba(0,135,215,0.08)]"
        aria-hidden
      />
      <div className="absolute left-1/2 top-1/2 z-10 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(0,56,89,0.14)]">
        <Image
          src="/images/logo-icon.svg"
          alt=""
          width={96}
          height={96}
          className="h-[58%] w-[58%] object-contain"
          aria-hidden
        />
      </div>

      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`absolute z-20 hidden lg:block ${ORBIT_POSITIONS[index]}`}
        >
          <OrbitStatCard value={stat.value} label={stat.label} />
        </div>
      ))}
    </div>
  );
}

export default function BannerSection({ data }: BannerSectionProps) {
  const { headline, stats, description, ctas } = data;

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 lg:py-20 lg:py-28">
      <div className="container relative z-10 ">
        <div className="mx-auto flex w-full flex-col items-center gap-10 lg:gap-12">
          <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex w-full flex-1 flex-col gap-6 text-center lg:max-w-[52%] lg:text-left">
              <div className="flex flex-col gap-4 sm:gap-5">
                <h1 className="font-jakarta text-[clamp(32px,5vw,62px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                  <span className="text-[#003859]">{headline.line1}</span>
                  <br />
                  <span className="text-[#0087D7]">{headline.line2}</span>
                </h1>

                <p className="font-jakarta text-[clamp(15px,1.2vw,20px)] font-normal leading-[1.75] text-[#52697A]">
                  {description}
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
                {ctas.map((cta) => (
                  <HoverSwapButton
                    key={`${cta.href}-${cta.label}`}
                    href={cta.href}
                    label={cta.label}
                    hoverLabel={cta.hoverLabel}
                    variant={cta.variant === "outline" ? "secondary" : "cta"}
                    showChevrons={false}
                    showArrow={"showArrow" in cta && cta.showArrow}
                    className="font-ano w-full px-6 py-3.5 text-base sm:w-auto lg:text-lg"
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full flex-1 justify-center lg:justify-end">
              <LogoOrbitVisual stats={stats} />
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 sm:gap-4 lg:hidden">
            {stats.map((stat) => (
              <OrbitStatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
