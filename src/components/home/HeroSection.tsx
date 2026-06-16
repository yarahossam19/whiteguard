import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { HeroData } from "@/data/hero";
import type { ClientLogosData } from "@/data/client-logos";
import ClientLogos from "../shared/ClientLogos";
import Image from "next/image";

interface HeroSectionProps {
  data: HeroData;
  logos: ClientLogosData;
}

export default function HeroSection({ data, logos }: HeroSectionProps) {
  const { headline, description, description2, ctas, decorations, rightPanel } =
    data;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="flex min-h-[50vh] flex-col xl:flex-row xl:flex-row-reverse lg:min-h-screen">
        {/* Banner first in DOM for faster LCP on mobile */}
        <div className="relative inset-y-[-5vh] z-10 min-h-[50vh] w-full xl:inset-0 xl:w-[50%] min-[1600px]:w-[50%]! lg:min-h-screen">
          <Image
            src="/images/banner-mobile.png"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-fill object-top xl:hidden"
            aria-hidden
          />
          <Image
            src={rightPanel.backgroundImage}
            alt=""
            fill
            sizes="(min-width: 1280px) 50vw, 0px"
            className="hidden object-fill object-top xl:block"
            aria-hidden
          />
          <Image
            src="/images/logo-white.svg"
            alt=""
            width={500}
            height={500}
            priority
            className="absolute top-[50%] left-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] object-contain xl:top-[30%] xl:left-[52.5%]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 items-start justify-start px-4 py-4 sm:px-6 sm:py-4 xl:py-[4%] xl:ps-[5vw]">
          <div className="flex flex-col gap-10 text-[#003859] xl:max-w-[800px]">
            <div className="flex flex-col gap-5 text-center xl:text-left">
              <h1 className="hero-font text-center font-jakarta leading-[1.18] tracking-[-0.03em] xl:text-left">
                <span className="font-extrabold">{headline.line1.bold}</span>

                <div className="flex items-center justify-center gap-0 xl:items-start xl:justify-start">
                  <span className="font-light">{headline.line1.light}</span>
                  <span className="font-extrabold">{headline.line1.end}</span>
                  <Image
                    src={decorations.sparkleTop}
                    width={65}
                    height={68}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none ms-4 hidden h-[40px] w-[65px] -rotate-[0deg] object-contain select-none lg:block xl:h-[68px] xl:w-[65px]"
                  />
                </div>

                <span className="text-center font-extrabold xl:text-left">
                  {headline.line2.bold}
                </span>
                <div className="flex items-center justify-center gap-0 xl:justify-start">
                  <span className="font-light">{headline.line2.light}</span>
                  <span className="font-extrabold">{headline.line2.end}</span>
                  <Image
                    width={65}
                    height={70}
                    src={decorations.sparkleBottom}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none ms-4 hidden h-[40px] w-[40px] -rotate-[0deg] object-contain select-none lg:block xl:h-[70px] xl:w-[65px]"
                  />
                </div>
              </h1>
              <p className="font-Jakarta w-full text-[clamp(16px,1.4vw,20px)] font-normal leading-[1.7]">
                {description}
                <br />
                {description2}
              </p>
            </div>

            <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 md:w-auto md:flex-row xl:justify-start">
              {ctas.map((cta) => (
                <HoverSwapButton
                  key={cta.href}
                  href={cta.href}
                  label={cta.label}
                  hoverLabel={cta.hoverLabel}
                  variant={cta.variant as "cta" | "secondary"}
                  showChevrons={false}
                  className="w-full px-3 py-[14px] font-ano text-[clamp(14px,1.1vw,24px)] md:w-auto lg:px-6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ClientLogos logos={logos} />
    </section>
  );
}
