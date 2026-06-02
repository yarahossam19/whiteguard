import Image from "next/image";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { IndustryHeroLogoStripItem } from "@/types/industry-page";

interface IndustryHeroSectionProps {
  clipPathId: string;
  headline: string;
  intro: string;
  heroImageSrc: string;
  heroImageAlt: string;
  logos: IndustryHeroLogoStripItem[];
  primaryHref: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryExternal?: boolean;
}

export default function IndustryHeroSection({
  clipPathId,
  headline,
  intro,
  heroImageSrc,
  heroImageAlt,
  logos,
  primaryHref,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  secondaryExternal,
}: IndustryHeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden z-10 bg-white pb-12 pt-8 xl:pb-32 xl:pt-12"
      aria-labelledby="industry-hero-heading"
    >
      <div className="container">
        <div className="flex flex-col-reverse items-stretch gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14">
          <div className="flex max-w-xl flex-col justify-between gap-10 lg:max-w-1/2 lg:flex-1 lg:gap-12 xl:min-h-[520px]">
            <div className="flex flex-col gap-4">
              <h1
                id="industry-hero-heading"
                className="font-jakarta text-[clamp(28px,4vw,45px)] font-bold leading-[1.2] tracking-tight text-[#003859]"
              >
                {headline}
              </h1>

              <p className="font-jakarta text-base font-normal leading-[1.5] text-[#52697a] xl:text-lg xl:leading-relaxed">
                {intro}
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
              <HoverSwapButton
                href={primaryHref}
                label={primaryLabel}
                hoverLabel={primaryLabel}
                variant="cta"
                showChevrons={false}
                className="w-full min-w-0 shrink-0 px-6 sm:w-[280px]"
              />
              {secondaryExternal ? (
                <HoverSwapButton
                  href="https://www.whitehwk.com"
                  label={secondaryLabel}
                  hoverLabel={secondaryLabel}
                  variant="secondary"
                  showChevrons={false}
                  showImg={true}
                  imgSrc="/images/icons/external-link.svg"
                  className="text-sm md:text-base xl:text-lg flex flex-row-reverse items-center gap-2  font-ano"
                />
              ) : (
                <HoverSwapButton
                  href={secondaryHref}
                  label={secondaryLabel}
                  hoverLabel={secondaryLabel}
                  variant="secondary"
                  showChevrons={false}
                  className="w-full shrink-0 sm:w-[280px] text-sm md:text-base xl:text-lg flex flex-row-reverse items-center gap-2  font-ano"
                  showArrow={false}
                  showImg={true}
                  imgSrc="/images/icons/external-link.svg"
                />
              )}
            </div>

            {logos.length > 0 ? (
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-6 border-t border-transparent pt-2 lg:border-t-0 lg:pt-0">
                {logos.map((logo) =>
                  logo.name === "all logos" ? (
                    <div
                      key={`${logo.src}-${logo.name}`}
                      className="relative flex max-h-9 flex-1 items-center justify-center sm:max-w-[642px] sm:flex-none"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={642}
                        height={34}
                        className="max-h-[43px] w-auto object-contain object-bottom"
                      />
                    </div>
                  ) : (
                    <div
                      key={`${logo.src}-${logo.name}`}
                      className="relative flex h-12 flex-1 items-center justify-center grayscale transition-[filter] duration-300 hover:grayscale-0 sm:h-14 sm:max-w-[122px] sm:flex-none"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={116}
                        height={52}
                        className="max-h-[52px] w-auto object-contain object-bottom"
                      />
                    </div>
                  ),
                )}
              </div>
            ) : null}
          </div>

          <div className="relative mx-auto w-full max-w-[520px] shrink-0 lg:mx-0 lg:max-w-[644px] lg:flex-1 lg:p-10">
            <div
              className="relative aspect-square w-full lg:aspect-[644/647]"
              style={{ clipPath: `url(#${clipPathId})` }}
            >
              <Image
                src={heroImageSrc}
                alt={heroImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 644px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
