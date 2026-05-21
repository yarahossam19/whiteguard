import { SectionVideoSeparator } from "@/components/ui/SectionVideoSeparator";
import type { IndustrialAutomotiveBattlefieldBandData } from "@/types/industry-page";
import Image from "next/image";

interface IndustrialAutomotiveBattlefieldSectionProps {
  data: IndustrialAutomotiveBattlefieldBandData;
}

/** Illustration bounds — node `3008:27989`; dashed flow `2996:27060`. */
const ART_W = 600.6062927246094;
const ART_H = 225.36433410644531;

/** Figma dashed connector stroke — `2996:27060`. */
const FLOW_COLOR = "#02a1ff";

function pctW(px: number) {
  return `${(px / ART_W) * 100}%`;
}

function pctH(py: number) {
  return `${(py / ART_H) * 100}%`;
}

function IndustrialSignalIcon() {
  return (
    <div
      className="relative h-[34px] w-[34px] shrink-0 rounded-[10px] border border-[#cfe5ec] bg-white"
      aria-hidden
    >
      <span className="absolute left-2 top-[17px] h-2 w-1 rounded-[2px] bg-[#003859]" />
      <span className="absolute left-[14px] top-3 h-[13px] w-1 rounded-[2px] bg-[#003859]" />
      <span className="absolute left-5 top-[7px] h-[18px] w-1 rounded-[2px] bg-[#003859]" />
    </div>
  );
}

const ASSETS = {
  wgMark: "/images/industries/section-industrial-automotive/wg-mark.webp",
  shieldFactory:
    "/images/industries/section-industrial-automotive/shield-factory.webp",
  shieldDealer:
    "/images/industries/section-industrial-automotive/shield-dealer.webp",
  shieldVehicle:
    "/images/industries/section-industrial-automotive/shield-vehicle.webp",
  threatSkull:
    "/images/industries/section-industrial-automotive/threat-skull-monitor.webp",
  threatBug: "/images/industries/section-industrial-automotive/threat-bug.webp",
} as const;

/** Figma `2996:27031` — “Automotive cybersecurity” + battlefield proof card. */
export default function IndustrialAutomotiveBattlefieldSection({
  data,
}: IndustrialAutomotiveBattlefieldSectionProps) {
  const { headline, intro, features, illustrationCard } = data;
  const [fA, fB] = features;

  return (
    <>
      {" "}
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />{" "}
      <section
        className="relative w-full overflow-hidden py-16 xl:py-[100px]"
        aria-labelledby="industrial-automotive-cyber-headline"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1506px] justify-center px-6 md:px-10 xl:px-[97px]">
          <div className="flex w-full flex-col gap-12 xl:max-w-[1312px] xl:flex-row xl:items-start xl:gap-6">
            {/* Left column — `2996:27033`: 624 × 700, justify-between */}
            <div className="flex w-full shrink-0 flex-col justify-between gap-12 xl:h-[700px] xl:w-[624px] xl:pb-[50px]">
              <div className="flex flex-col gap-4">
                <h2
                  id="industrial-automotive-cyber-headline"
                  className="font-jakarta text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] text-[#003859] xl:text-[40px]"
                >
                  {headline}
                </h2>
                <p className="max-w-[624px] pr-0 font-jakarta text-[17px] font-normal leading-[1.56] text-[#52697a] xl:pr-4 xl:text-[18px]">
                  {intro}
                </p>
              </div>

              <div className="flex flex-col gap-10 sm:flex-row sm:justify-between xl:w-[624px]">
                <FeatureBlock {...fA} />
                <FeatureBlock {...fB} />
              </div>
            </div>

            {/* Box */}
            <div className="relative order-1 mx-auto w-full max-w-[664px] shrink-0 xl:order-none">
              <div
                className="relative lg:aspect-664/666 overflow-hidden rounded-[30px]   shadow-[0px_26px_44px_-18px_rgba(0,56,89,0.06)]"
                style={{
                  background:
                    "linear-gradient(180deg, #fff 70%, transparent 100%)",
                }}
              >
                <div className="relative z-10 flex flex-col gap-6 px-[clamp(28px,_6.34vw,_42px)] pt-[clamp(31px,_6.34vw,_42px)] xl:gap-24">
                  <div className="flex max-w-[580px] flex-col gap-[6px] text-[#006dad]">
                    <p className="font-jakarta text-[clamp(22px,2.6vw,28px)] font-bold leading-[34px] xl:text-[28px] xl:tracking-normal">
                      {illustrationCard.title}
                    </p>
                    <p className="max-w-[580px] font-jakarta text-[13px] font-normal leading-[20px] sm:text-[14px] xl:leading-[20px]">
                      {illustrationCard.subtitle}
                    </p>
                  </div>
                  <Image
                    src="/images/industries/section-industrial-automotive/industrial-automotive.svg"
                    alt="Claims Vault"
                    width={90}
                    height={38}
                    className="h-auto    mx-auto object-contain mt-4 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave-bottom.mp4"
      />
    </>
  );
}

function FeatureBlock(
  props: IndustrialAutomotiveBattlefieldBandData["features"][number],
) {
  return (
    <div className="flex max-w-[280px] shrink-0 flex-col gap-3">
      <IndustrialSignalIcon />
      <p className="font-jakarta text-base font-bold leading-[1.25] text-[#092131]">
        {props.title}
      </p>
      <p className="font-jakarta text-[13px] font-normal leading-[1.5] text-[#52697a]">
        {props.description}
      </p>
    </div>
  );
}
