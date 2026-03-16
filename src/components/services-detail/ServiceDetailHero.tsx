import Image from "next/image";
import Link from "next/link";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";

interface ServiceDetailHeroProps {
  headline: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export default function ServiceDetailHero({
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: ServiceDetailHeroProps) {
  return (
    <>
      <section className="relative flex min-h-[90vh] lg:h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-16 lg:py-30">
        {/* Optional decorative background - light wave texture */}
        <div
          className="pointer-events-none absolute  w-full"
          aria-hidden
          style={{
            backgroundImage: "url(/images/layer-bg.svg)",
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "repeat-x",
            // backgroundRepeatY: "no-repeat",

            width: "100%",
            left: "0",
            bottom: "0",
            position: "absolute",
            zIndex: 1,
          }}
        />
        <div className="relative z-10 flex max-w-[1000px] flex-col items-center gap-[53px] text-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-jakarta text-[clamp(28px,4vw,50px)] font-bold leading-[1.2] text-[#003859]">
              {headline}
            </h1>
            <p className="max-w-[752px] font-jakarta text-[16px] font-normal leading-[30.6px] text-[#52697a] lg:text-[20px]">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <HoverSwapButton
              href={ctaPrimary.href}
              label={ctaPrimary.label}
              hoverLabel={ctaPrimary.label}
              showChevrons={false}
              variant="cta"
            />
            <HoverSwapButton
              href={ctaSecondary.href}
              label={ctaSecondary.label}
              hoverLabel={ctaSecondary.label}
              variant={"secondary"}
              showChevrons={false}
              showImg={true}
              imgSrc="/images/icons/download.svg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
