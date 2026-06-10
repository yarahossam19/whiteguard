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
    <div className="min-w-[128px] rounded-2xl border border-white/90 bg-white/95 px-4 py-3 text-center shadow-[0_16px_40px_rgba(0,56,89,0.12)] backdrop-blur-sm sm:min-w-[148px] sm:px-5 sm:py-4">
      <p className="font-jakarta text-[clamp(22px,2.5vw,32px)] font-extrabold leading-none text-[#0087D7]">
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
    <div className="relative mx-auto h-[60px] w-full max-w-[320px] sm:h-[300px] sm:max-w-[360px] xl:h-[380px] xl:max-w-[400px]">
      <div
        className="absolute inset-[2%] rounded-full border border-[#0087D7]/10"
        aria-hidden
      />
      <div
        className="absolute inset-[12%] rounded-full border border-dashed border-[#0087D7]/18"
        aria-hidden
      />
      <div
        className="absolute inset-[22%] rounded-full bg-linear-to-br from-[#E7F6FF] via-white to-[#ABE0FF]/50 shadow-[inset_0_0_40px_rgba(0,135,215,0.08)]"
        aria-hidden
      />
      <div className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(0,56,89,0.14)]">
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
          className={`absolute hidden xl:block ${ORBIT_POSITIONS[index]}`}
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
    <section className="relative w-full overflow-hidden min-h-[80vh] py-30  ">
      <div className="container relative z-10   py-20 sm:py-24 xl:py-28">
        <div className="mx-auto flex w-full   flex-col items-center gap-12 xl:flex-row xl:items-center xl:gap-16">
          <div className="flex flex-1 flex-col gap-8 text-center   xl:text-left">
            <div className="flex flex-col gap-5">
              <h1
                className="font-jakarta font-semibold leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: "clamp(38px, 5vw, 62px)" }}
              >
                <span className="text-[#003859]">{headline.line1}</span>
                <br />
                <span className="text-[#0087D7]">{headline.line2}</span>
              </h1>

              <p
                className="font-jakarta font-normal leading-[1.75] text-[#52697A]"
                style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}
              >
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 xl:justify-start">
              {ctas.map((cta) => (
                <HoverSwapButton
                  key={`${cta.href}-${cta.label}`}
                  href={cta.href}
                  label={cta.label}
                  hoverLabel={cta.hoverLabel}
                  variant={cta.variant === "outline" ? "secondary" : "cta"}
                  showChevrons={false}
                  showArrow={"showArrow" in cta && cta.showArrow}
                  className="font-ano w-full px-6 py-3.5 text-base md:w-auto xl:text-lg"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-1 justify-center xl:justify-end">
            <LogoOrbitVisual stats={stats} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 xl:hidden">
          {stats.map((stat) => (
            <OrbitStatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
