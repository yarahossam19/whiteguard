import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { HeroData } from "@/data/hero";
import ClientLogos from "@/components/shared/ClientLogos";

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { headline, description, ctas, decorations, rightPanel } = data;

  return (
    <section className="relative w-full  ">
      <div className="min-h-screen flex flex-col lg:flex-row  ">
        {/*  LEFT CONTENT */}
        <div className="relative flex-1 flex items-center justify-start px-8 sm:px-12 lg:px-[7vw] py-16 lg:py-0 z-10  ">
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
          className="relative z-10 w-full lg:w-[50%]  lg:min-h-full  
			 "
          style={{ background: "transparent" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-bottom-right bg-no-repeat h-[135vh]"
            style={{ backgroundImage: `url(${rightPanel.backgroundImage})` }}
            aria-hidden
          />
          <video
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
            className="absolute inset-0  object-cover"
            aria-hidden
          />

          {/* Overlay gradient for readability */}
          <div
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
          />
        </div>
      </div>
      <ClientLogos />
    </section>
  );
}
