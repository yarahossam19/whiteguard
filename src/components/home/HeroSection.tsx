"use client";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { HeroData } from "@/data/hero";
import type { ClientLogosData } from "@/data/client-logos";
import ClientLogos from "../shared/ClientLogos";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

interface HeroSectionProps {
  data: HeroData;
  logos: ClientLogosData;
}

export default function HeroSection({ data, logos }: HeroSectionProps) {
  const { headline, description, ctas, decorations, rightPanel } = data;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <section className="relative w-full overflow-hidden  ">
      <div className="lg:min-h-screen  flex flex-col-reverse lg:flex-row  ">
        {/*  LEFT CONTENT */}
        <div className="relative z-10 flex flex-1 items-center justify-start px-4 py-4 sm:px-8 sm:py-4 lg:ps-[7vw] lg:py-0">
          <Image
            src={decorations.sparkleTop}
            width={65}
            height={68}
            alt=""
            aria-hidden="true"
            className="  absolute left-[15%] md:left-[30%] lg:left-[unset] lg:right-[28%] top-[15%] md:top-[16%] lg:top-[25%] w-[40px] h-[40px] lg:w-[65px] lg:h-[68px] object-contain   pointer-events-none select-none"
          />

          <div className="flex flex-col gap-10 lg:max-w-[560px] text-[#003859]">
            {/* Headline */}
            <div className="flex flex-col gap-5 text-center lg:text-left">
              <h1 className="font-jakarta leading-[1.18] text-center lg:text-left tracking-[-0.03em] text-[clamp(36px,5vw,58px)] ">
                <span className=" font-extrabold">{headline.line1.bold}</span>
                <span className="font-light">{headline.line1.light}</span>
                <span className=" font-extrabold text-center lg:text-left">
                  {headline.line1.end}
                </span>
                <br />
                <span className=" font-extrabold text-center lg:text-left">
                  {headline.line2.bold}
                </span>
                <div className="flex  items-center gap-0 justify-center lg:justify-start">
                  <span className="font-light">{headline.line2.light}</span>
                  <span className=" font-extrabold text-center lg:text-left">
                    {headline.line2.end}
                  </span>{" "}
                  <Image
                    width={65}
                    height={70}
                    src={decorations.sparkleBottom}
                    alt=""
                    aria-hidden="true"
                    className="  ms-4 lg:block  lg:w-[65px] lg:h-[70px] w-[40px] h-[40px] object-contain -rotate-[0deg] pointer-events-none select-none"
                  />
                </div>
              </h1>
              <p className="font-Jakarta   text-[clamp(16px,20px,20px)] font-normal leading-[1.7]">
                {description}
              </p>{" "}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center lg:justify-start w-full md:w-auto">
              {ctas.map((cta) => (
                <HoverSwapButton
                  key={cta.href}
                  href={cta.href}
                  label={cta.label}
                  hoverLabel={cta.hoverLabel}
                  variant={cta.variant as "cta" | "secondary"}
                  showChevrons={false}
                  className="px-6 py-[14px] text-[clamp(16px,1.4vw,24px)]  font-ano w-full md:w-auto"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div
          className="relative  inset-y-[-5vh] lg:inset-0 z-10 w-full lg:w-[50%] min-[1600px]:w-[50%]! min-h-[40vh] lg:min-h-screen   "
          style={{
            backgroundImage: `url(${isTablet ? "/images/banner-mobile.png" : rightPanel.backgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src="/images/logo-white.svg"
            alt="Hero Video"
            width={500}
            height={500}
            className="absolute  w-full h-[50%] object-contain left-[50%] lg:top-[30%] top-[50%] translate-x-[-50%] translate-y-[-50%] animate-ping"
          />
          <Image
            src="/images/logo-white.svg"
            alt="Hero Video"
            width={500}
            height={500}
            className="absolute     w-[50%] h-[50%]   object-contain left-[50%] lg:top-[30%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
          {/* <video
            src={rightPanel.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "60%",
              height: "60%",
              left: "60%",
              top: "38%",
              zIndex: 1,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute inset-0 w-[40%]  h-[100%] min-[1600px]:w-[60%]! min-[1600px]:h-[60%]! object-cover"
            aria-hidden
          /> */}

          {/* Overlay gradient for readability */}
          {/* <div
            className="absolute pointer-events-none"
            aria-hidden
            style={{
              height: "80%",
              width: "100%",
              right: 0,

              background:
                "radial-gradient(circle, #003859 50%,transparent 70%, transparent 70%)",
              left: "unset",
              zIndex: 0,
            }}
          /> */}
        </div>
      </div>
      <ClientLogos logos={logos} />
    </section>
  );
}
