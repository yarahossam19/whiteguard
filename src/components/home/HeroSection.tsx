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
  const { headline, description, ctas, decorations, rightPanel } = data;

  return (
    <section className="relative w-full  ">
      <div className="min-h-screen flex flex-col lg:flex-row  ">
        {/*  LEFT CONTENT */}
        <div className="relative z-10 flex flex-1 items-center justify-start px-4 py-16 sm:px-8 sm:py-16 lg:ps-[7vw] lg:py-0">
          <img
            src={decorations.sparkleTop}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute right-[28%] top-[25%] w-[65px] h-[68px] object-contain   pointer-events-none select-none"
          />

          <div className="flex flex-col gap-10 max-w-[560px] text-[#003859]">
            {/* Headline */}
            <div className="flex flex-col gap-5">
              <h1 className="font-jakarta leading-[1.18] tracking-[-0.03em] text-[clamp(36px,5vw,58px)] ">
                <span className=" font-extrabold">{headline.line1.bold}</span>
                <span className="font-light">{headline.line1.light}</span>
                <span className=" font-extrabold">{headline.line1.end}</span>
                <br />
                <span className=" font-extrabold">{headline.line2.bold}</span>
                <div className="flex items-center gap-0">
                  <span className="font-light">{headline.line2.light}</span>
                  <span className=" font-extrabold">
                    {headline.line2.end}
                  </span>{" "}
                  <img
                    src={decorations.sparkleBottom}
                    alt=""
                    aria-hidden="true"
                    className="hidden ms-4 lg:block  w-[65px] h-[70px] object-contain -rotate-[0deg] pointer-events-none select-none"
                  />
                </div>
              </h1>
              <p className="font-Jakarta   text-[clamp(16px,20px,20px)] font-normal leading-[1.7]">
                {description}
              </p>{" "}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              {ctas.map((cta) => (
                <HoverSwapButton
                  key={cta.href}
                  href={cta.href}
                  label={cta.label}
                  hoverLabel={cta.hoverLabel}
                  variant={cta.variant as "cta" | "secondary"}
                  showChevrons={false}
                  className="px-6 py-[14px] text-[clamp(16px,1.4vw,24px)]  font-ano"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div
          className="relative inset-0 z-10 w-full lg:w-[50%] min-[1600px]:w-[50%]! lg:min-h-[100vh] hidden lg:block "
          style={{
            backgroundImage: `url(${rightPanel.backgroundImage})`,
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
            className="absolute w-[50%] h-[50%] object-contain left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%] animate-ping"
          />
          <Image
            src="/images/logo-white.svg"
            alt="Hero Video"
            width={500}
            height={500}
            className="absolute     w-[50%] h-[50%]   object-contain left-[50%] top-[30%] translate-x-[-50%] translate-y-[-50%]"
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
