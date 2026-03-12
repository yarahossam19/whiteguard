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
    <section className="relative w-full  flex flex-col gap-20  px-8 sm:px-12 lg:px-[7vw] py-10 lg:py-14">
      <div className="lg:max-h-screen flex flex-col lg:flex-row  ">
        {/*  LEFT CONTENT */}
        <div className="relative flex-1 flex items-center justify-center z-10  ">
          <div className="flex flex-col gap-10 max-w-[932px] items-center text-[#003859]">
            {/* Headline */}
            <div className="flex flex-col items-center gap-5">
              <h1 className="font-jakarta leading-[1.18] tracking-[-0.03em] text-[clamp(36px,6vw,64px)] ">
                <span className=" font-extrabold">{headline.line1}</span>

                <div className="relative  flex items-center justify-center text-center mt-5 gap-0">
                  <span
                    className="z-10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] bg-[rgba(150, 220, 255, 0.35)]"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "12%",
                      transform: "translateY( -50%)",
                      borderRadius: "345px",
                      background: "rgba(150, 220, 255, 0.35)",
                      backgroundColor: "rgba(150, 220, 255, 0.35)",
                      display: "flex",
                      width: "46px",
                      height: "46px",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src="/images/icons/check.svg"
                      alt="check"
                      width={23}
                      height={23}
                    />
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80%",
                      height: "90%",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      border: "2px solid #57C1FF",
                      padding: "10px 20px",
                    }}
                  ></span>
                  <span
                    className="z-10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] bg-[rgba(150, 220, 255, 0.35)]"
                    style={{
                      position: "absolute",
                      top: "5%",
                      left: "46%",
                      transform: "translate(50%, -50%)",
                      borderRadius: "345px",
                      background: "rgba(150, 220, 255, 0.35)",
                      backgroundColor: "rgba(150, 220, 255, 0.35)",
                      display: "flex",
                      width: "46px",
                      height: "46px",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src="/images/icons/check-doc.svg"
                      alt="check"
                      width={28}
                      height={28}
                    />
                  </span>
                  <span
                    className="z-10 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] bg-[rgba(150, 220, 255, 0.35)]"
                    style={{
                      position: "absolute",
                      top: "50%%",
                      right: "12%",
                      transform: "translateY(50%)",
                      borderRadius: "345px",
                      background: "rgba(150, 220, 255, 0.36)",
                      backgroundColor: "rgba(150, 220, 255, 0.36)",
                      display: "flex",
                      width: "46px",
                      height: "46px",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src="/images/icons/forward.svg"
                      alt="check"
                      width={19}
                      height={19}
                    />
                  </span>
                  <span className="text-[#0087D7]   font-extrabold">
                    {headline.line2}
                  </span>
                </div>
              </h1>
              <p className="font-Jakarta text-[#52697A]  text-center  text-[clamp(14px,1.8px,18px)] font-normal leading-[27px]">
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
      </div>
      <ClientLogos logos={logos} className="pt-0 lg:pt-0" />
    </section>
  );
}
