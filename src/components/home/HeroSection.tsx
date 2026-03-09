import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import ClientLogos from "./ClientLogos";

export default function HeroSection() {
  return (
    <section className="relative w-full  ">
      <div className="min-h-screen flex flex-col lg:flex-row  ">
        {/*  LEFT CONTENT */}
        <div className="relative flex-1 flex items-center justify-start px-8 sm:px-12 lg:px-[7vw] py-16 lg:py-0 z-10  ">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/489fd4fbc0c2620b6054dfc3bfa60d74a3fa9088?width=130"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute right-[28%] top-[25%] w-[65px] h-[68px] object-contain   pointer-events-none select-none"
          />

          <div className="flex flex-col gap-10 max-w-[560px] text-[#003859]">
            {/* Headline */}
            <div className="flex flex-col gap-5">
              <h1 className="font-jakarta leading-[1.18] tracking-[-0.03em] text-[clamp(36px,5vw,58px)] ">
                <span className=" font-extrabold">Cybersecurity </span>
                <span className="font-light">Simplified</span>
                <span className=" font-extrabold">. </span>
                <br />
                <span className=" font-extrabold">Protection </span>
                <div className="flex items-center gap-0">
                  <span className="font-light">Amplified</span>
                  <span className=" font-extrabold">.</span>{" "}
                  {/* Sparkle bottom-left of headline (desktop) */}
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/8dbe930ef8404aef89a8f08298bd988e3af5972e?width=130"
                    alt=""
                    aria-hidden="true"
                    className="hidden ms-4 lg:block  w-[65px] h-[70px] object-contain -rotate-[0deg] pointer-events-none select-none"
                  />
                </div>
              </h1>
              <p className="font-Jakarta   text-[clamp(16px,20px,20px)] font-normal leading-[1.7]">
                WHITEGUARD provides a new era of cybersecurity — visualized,
                simplified, and under your control.
              </p>{" "}
            </div>

            {/* CTA Buttons - HoverSwapButton */}
            <div className="flex flex-wrap gap-4 items-center">
              <HoverSwapButton
                href="/contact"
                label="Book a Consultation"
                hoverLabel="Book a Consultation"
                variant="cta"
                showChevrons={false}
                className="px-6 py-[14px] text-[clamp(16px,1.4vw,24px)]  font-ano"
              />
              <HoverSwapButton
                href="/services"
                label="Explore Services"
                hoverLabel="Explore Services"
                variant="secondary"
                showChevrons={false}
                className="px-6 py-[14px] text-[clamp(16px,1.4vw,24	px)] font-ano"
              />
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div
          className="relative w-full lg:w-[50%]  lg:min-h-full  
			 "
          style={{ background: "transparent" }}
        >
          {/* Background image behind video */}
          <div
            className="absolute inset-0 bg-cover bg-bottom-right bg-no-repeat h-[135vh]"
            style={{ backgroundImage: "url(/images/banner-bg.png)" }}
            aria-hidden
          />
          {/* Banner Video - Figma 1850:3656 */}
          <video
            src="/videos/banner.mp4"
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
