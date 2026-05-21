import { SectionVideoSeparator } from "@/components/ui/SectionVideoSeparator";
import type { IndustrialOilGasCyberBandData } from "@/types/industry-page";
import Image from "next/image";

interface IndustrialOilGasCyberSectionProps {
  data: IndustrialOilGasCyberBandData;
}

/** Inner artboard `3008:27997` dimensions (px). */
const ART_W = 448.6619873046875;
const ART_H = 367.8515625;

function pctW(px: number) {
  return `${(px / ART_W) * 100}%`;
}

function pctH(py: number) {
  return `${(py / ART_H) * 100}%`;
}

const ASSETS = {
  flowVertical: "/images/industries/section-oil-gas/check.svg",
  flowDiagBr: "/images/industries/section-oil-gas/flow-diag-br.webp",
  flowDiagBl: "/images/industries/section-oil-gas/flow-diag-bl.webp",
  check: "/images/industries/section-oil-gas/fi-sr-check.webp",
  sensor: "/images/industries/section-oil-gas/icon-sensor.webp",
  pump: "/images/industries/section-oil-gas/icon-pump.webp",
  wgMark: "/images/industries/section-oil-gas/wg-mark.webp",
  valve: "/images/industries/section-oil-gas/icon-valve.webp",
} as const;
export default function IndustrialOilGasCyberSection({
  data,
}: IndustrialOilGasCyberSectionProps) {
  const { headline, intro, checklistItems, illustrationCard } = data;
  const [c0, c1, c2, c3] = checklistItems;

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
        aria-labelledby="industrial-oil-gas-headline"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="container mx-auto flex w-full   justify-center  ">
          <div className=" mx-auto flex w-full flex-col-reverse gap-12   xl:flex-row xl:items-start xl:gap-6">
            {/* Left */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-12 xl:flex-1 xl:gap-[100px]">
              <div className="flex flex-col gap-4">
                <h2
                  id="industrial-oil-gas-headline"
                  className="max-w-none font-jakarta text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] text-[#003859] xl:text-[40px]"
                >
                  {headline}
                </h2>
                <p className="max-w-[608px] font-jakarta text-[17px] font-normal leading-[1.56] text-[#52697a] xl:text-[18px]">
                  {intro}
                </p>
              </div>

              <div className="flex flex-wrap justify-between  gap-y-6   xl:gap-y-[34px]">
                <CheckItem label={c0} minWClass="xl:min-w-0 xl:w-1/2" />
                <CheckItem label={c1} minWClass="xl:min-w-0 xl:w-1/2" />
                <CheckItem label={c2} minWClass="xl:min-w-0 xl:w-1/2" />
                <CheckItem label={c3} minWClass="xl:min-w-0 xl:w-1/2" />
              </div>
            </div>

            {/* Box */}
            <div className="relative order-1 mx-auto w-full max-w-1/2 shrink-0 xl:order-none">
              <div
                className="relative lg:aspect-664/666 overflow-hidden rounded-[30px]   shadow-[0px_26px_44px_-18px_rgba(0,56,89,0.06)]"
                style={{
                  background:
                    "linear-gradient(180deg, #fff 70%, transparent 100%)",
                }}
              >
                <div className="relative z-10 flex flex-col gap-6 px-[clamp(28px,_6.34vw,_42px)] pt-[clamp(31px,_6.34vw,_42px)] xl:gap-12">
                  <div className="flex max-w-[580px] flex-col gap-[6px] text-[#006dad]">
                    <p className="font-jakarta text-[clamp(22px,2.6vw,28px)] font-bold leading-[34px] xl:text-[28px] xl:tracking-normal">
                      {illustrationCard.title}
                    </p>
                    <p className="max-w-[580px] font-jakarta text-[13px] font-normal leading-[20px] sm:text-[14px] xl:leading-[20px]">
                      {illustrationCard.subtitle}
                    </p>
                  </div>
                  <Image
                    src="/images/industries/section-oil-gas/oil-gas.svg"
                    alt="Claims Vault"
                    width={90}
                    height={38}
                    className="h-auto  lg:w-3/4 mx-auto object-contain mt-4 w-full"
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

function CheckItem({ label, minWClass }: { label: string; minWClass: string }) {
  return (
    <div className={`flex shrink-0 items-center gap-2 ${minWClass}`}>
      <span
        className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#0087d7] px-[6px] py-[6px]"
        aria-hidden
      >
        <Image
          src={"/images/industries/section-oil-gas/check.svg"}
          alt="check icon"
          width={13}
          height={13}
          className="size-[13px] object-contain"
        />
      </span>
      <p className="whitespace-normal font-jakarta text-base font-bold leading-[1.25] text-[#092131] sm:whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
