import type { IndustrialManufacturingCyberBandData } from "@/types/industry-page";
import Image from "next/image";

interface IndustrialManufacturingCyberSectionProps {
  data: IndustrialManufacturingCyberBandData;
}

/** Matches signal tile `2996:27105` … */
function ManufacturingSignalIcon() {
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

/** Figma `2996:27083` — white band, `#E7F6FF` card left, prose + two features right. */
export default function IndustrialManufacturingCyberSection({
  data,
}: IndustrialManufacturingCyberSectionProps) {
  const {
    illustrationCard,
    illustrationImageSrc,
    illustrationImageAlt,
    headline,
    intro,
    features,
  } = data;
  const [fA, fB] = features;
  const mapAlt =
    illustrationImageAlt ??
    `${illustrationCard.title}: ${illustrationCard.subtitle}`;

  return (
    <section
      className="relative w-full overflow-hidden bg-white pb-16 xl:pb-[180px]"
      aria-labelledby="industrial-manufacturing-cyber-headline"
    >
      <div className="container mx-auto w-full     ">
        <div className="mx-auto flex w-full flex-col gap-12 xl:max-w-[1312px] xl:flex-row xl:items-start xl:gap-6">
          {/* Box */}
          <div className="mx-auto w-full lg:max-w-1/2 shrink-0  ">
            <div className="relative min-h-[480px] w-full overflow-hidden rounded-[30px] border border-[#abe0ff] bg-[#e7f6ff] shadow-[0px_26px_44px_-18px_rgba(0,56,89,0.06)] xl:min-h-[666px]">
              <div className="relative z-10 px-8 pb-8 pt-10 xl:absolute xl:left-[41px] xl:top-[41px] xl:max-w-[580px] xl:px-0 xl:pb-0 xl:pt-0">
                <div className="flex flex-col gap-[6px] font-jakarta text-[#006dad]">
                  <p className="text-[clamp(22px,2.8vw,28px)] font-bold leading-[1.2] xl:text-[28px]">
                    {illustrationCard.title}
                  </p>
                  <p className="text-[13px] font-normal leading-[1.45] sm:text-[14px]">
                    {illustrationCard.subtitle}
                  </p>
                </div>
              </div>

              <div className="relative mx-auto mt-8 h-[min(65vw,426px)] w-full max-w-[402px] sm:h-[426px] xl:absolute xl:left-[106px] xl:mx-0 xl:mt-0 xl:h-[425.867px] xl:max-w-none xl:w-[402.364px] xl:top-[172.57px]">
                <div className="relative size-full">
                  <Image
                    src={illustrationImageSrc}
                    alt={mapAlt}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width:1280px) 90vw, 402px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="flex flex-col gap-[100px]">
              <div className="flex flex-col gap-4">
                <h2
                  id="industrial-manufacturing-cyber-headline"
                  className="font-jakarta text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] text-[#003859] xl:text-[40px]"
                >
                  {headline}
                </h2>
                <p className="max-w-none font-jakarta text-[17px] font-normal leading-[1.56] text-[#52697a] xl:text-[18px]">
                  {intro}
                </p>
              </div>

              <div className="flex flex-col gap-10 xl:h-[138px] xl:flex-row xl:items-center xl:justify-between xl:gap-6">
                <FeatureBlock {...fA} />
                <FeatureBlock {...fB} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBlock(
  props: IndustrialManufacturingCyberBandData["features"][number],
) {
  return (
    <div className="flex max-w-[280px] shrink-0 flex-col gap-3">
      <ManufacturingSignalIcon />
      <p className="font-jakarta text-base font-bold leading-[1.25] text-[#092131]">
        {props.title}
      </p>
      <p className="font-jakarta text-[13px] font-normal leading-[1.5] text-[#526271]">
        {props.description}
      </p>
    </div>
  );
}
