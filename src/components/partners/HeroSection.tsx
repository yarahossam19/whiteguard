"use client";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { PartnersHeroData } from "@/data/partners-hero";
import type { PartnersLogosData } from "@/data/partners-logos";
import ClientLogos from "@/components/shared/ClientLogos";
import Image from "next/image";

interface PartnersHeroSectionProps {
  data: PartnersHeroData;
  logos: PartnersLogosData;
}

export default function PartnersHeroSection({
  data,
  logos,
}: PartnersHeroSectionProps) {
  const { headline, description, ctas } = data;

  return (
    <section className="relative flex w-full flex-col gap-12 py-10 sm:gap-16 lg:gap-20 lg:py-14">
      <div className="container">
        <div className="flex flex-col lg:max-h-screen lg:flex-row">
          {/*  LEFT CONTENT */}
          <div className="relative z-10 flex flex-1 items-center justify-center">
            <div className="flex max-w-[932px] flex-col items-center gap-10 text-[#003859]">
              {/* Headline */}
              <div className="flex flex-col items-center gap-5 text-center">
                <h1 className="font-jakarta text-[clamp(36px,6vw,64px)] leading-[1.18] tracking-[-0.03em]">
                  <span className="font-extrabold">{headline.line1}</span>

                  <div className="relative mt-5 flex items-center justify-center gap-0 text-center">
                    <span className="absolute top-1/2 left-0 z-10 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-[345px] bg-[rgba(150,220,255,0.35)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] md:left-[12%]">
                      <Image
                        src="/images/icons/check.svg"
                        alt="check"
                        width={23}
                        height={23}
                      />
                    </span>
                    <span
                      className="absolute top-1/2 left-1/2 h-[90%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-[#57C1FF] bg-transparent px-5 py-2.5"
                      aria-hidden
                    />
                    <span className="absolute top-[5%] left-[46%] z-10 hidden h-[46px] w-[46px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[345px] bg-[rgba(150,220,255,0.35)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] md:flex">
                      <Image
                        src="/images/icons/check-doc.svg"
                        alt="check"
                        width={28}
                        height={28}
                      />
                    </span>
                    <span className="absolute top-[-50%] right-0 z-[2] flex h-[46px] w-[46px] translate-y-1/2 items-center justify-center rounded-[345px] bg-[rgba(150,220,255,0.36)] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] min-[1025px]:top-[-15%] md:right-[12%]">
                      <Image
                        src="/images/icons/forward.svg"
                        alt="check"
                        width={19}
                        height={19}
                      />
                    </span>
                    <span className="font-extrabold text-[#0087D7]">
                      {headline.line2}
                    </span>
                  </div>
                </h1>
                <p className="text-center font-Jakarta text-[clamp(14px,1.8px,18px)] font-normal leading-[27px] text-[#52697A]">
                  {description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {ctas.map((cta) => (
                  <HoverSwapButton
                    key={cta.href}
                    href={cta.href}
                    label={cta.label}
                    hoverLabel={cta.hoverLabel}
                    variant={cta.variant as "cta" | "secondary"}
                    showChevrons={false}
                    className="w-full px-6 py-[14px] font-ano text-[clamp(14px,1.1vw,24px)] md:w-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ClientLogos logos={logos} className="pt-0 lg:pt-0" />
    </section>
  );
}
