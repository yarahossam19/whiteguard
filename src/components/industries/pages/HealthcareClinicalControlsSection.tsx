import { SectionVideoSeparator } from "@/components/ui/SectionVideoSeparator";
import type { HealthcareClinicalControlsSectionData } from "@/types/industry-page";
import Image from "next/image";

/** Figma nodes `2947:9292` … — 34×34 white tile + three `#003859` bars. */
function ClinicalControlsSignalIcon() {
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

const STATUS_TONE: Record<
  HealthcareClinicalControlsSectionData["inventoryRows"][number]["statusTone"],
  string
> = {
  muted: "text-[#3d4f5c]",
  neutral: "text-[#3d4f5c]",
  success: "text-[#008127]",
  warning: "text-[#af5800]",
  danger: "text-[#d80000]",
};

interface HealthcareClinicalControlsSectionProps {
  data: HealthcareClinicalControlsSectionData;
}

/**
 * Healthcare “Clinical controls…” — Figma `2928:8144`.
 * Mirrors financial banking band structure: gradient backdrop, 2-column row, proof-style card right.
 */
export default function HealthcareClinicalControlsSection({
  data,
}: HealthcareClinicalControlsSectionProps) {
  const { headline, intro, features, illustrationCard, inventoryRows } = data;
  const [f0, f1, f2, f3] = features;

  return (
    <>
      {" "}
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />
      <section
        className="relative w-full overflow-hidden py-16 xl:py-[100px]"
        aria-labelledby="healthcare-clinical-controls-headline"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1506px] px-6 md:px-10 xl:px-[97px]">
          <div className="mx-auto flex max-w-[1312px] flex-col gap-10 xl:flex-row xl:items-stretch xl:gap-6">
            {/* Left   */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-12 xl:gap-10">
              <div className="flex flex-col gap-4">
                <h2
                  id="healthcare-clinical-controls-headline"
                  className="font-jakarta text-[clamp(28px,4vw,40px)] font-bold capitalize leading-[1.2] text-[#003859] xl:text-[40px]"
                >
                  {headline}
                </h2>
                <p className="max-w-[608px] pr-0 font-jakarta text-[17px] font-normal leading-[1.5] text-[#52697a] xl:pr-4 xl:text-[18px]">
                  {intro}
                </p>
              </div>

              <div className="flex flex-col gap-[50px]">
                <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-8 xl:justify-between xl:gap-4">
                  <FeatureBlock {...f0} />
                  <FeatureBlock {...f1} />
                </div>
                <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-8 xl:justify-between xl:gap-4">
                  <FeatureBlock {...f2} />
                  <FeatureBlock {...f3} />
                </div>
              </div>
            </div>

            {/* Box */}
            <div className="relative mx-auto w-full max-w-[664px] shrink-0 xl:mx-0">
              <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[30px] border border-[#d9e8ed] bg-white shadow-[0px_26px_44px_-18px_rgba(0,56,89,0.06)] xl:min-h-[666px]">
                <div
                  className="pointer-events-none absolute bottom-[-2px] left-[-101px] hidden h-[39px] w-[854px] rounded-[140px] bg-[#81d0ff] opacity-85 blur-[45px] xl:block"
                  aria-hidden
                />

                <div className="relative z-[1] px-[41px] pt-[41px]">
                  <div className="flex max-w-[580px] flex-col gap-[6px] font-jakarta text-[#006dad]">
                    <p className="text-[clamp(22px,2.6vw,28px)] font-bold leading-[1.2]">
                      {illustrationCard.title}
                    </p>
                    <p className="max-w-[580px] text-[13px] font-normal leading-[1.45] sm:text-[14px]">
                      {illustrationCard.subtitle}
                    </p>
                  </div>
                </div>

                <div className="relative z-[1] mx-auto mt-8 flex w-full max-w-[532px] flex-[1_0_auto] flex-col gap-[26px] px-4 pb-10 sm:px-6 xl:mt-10 xl:px-0 xl:pb-12">
                  {inventoryRows.map((row, i) => (
                    <div
                      key={`${row.name}-${i}`}
                      className={`flex h-[100px] shrink-0 items-center overflow-hidden rounded-lg bg-[#f6f6f6] px-6 py-4 lg:rounded-[8px] ${row.showReview === true ? "justify-between gap-[10px]" : "justify-start gap-[10px]"}`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-[10px] sm:flex-initial">
                        <div className="flex shrink-0 items-center justify-center rounded border-[0.5px] border-[rgba(194,205,214,0.24)] bg-white p-2">
                          <Image
                            src={row.iconSrc}
                            alt={row.iconAlt}
                            width={70}
                            height={70}
                            className="h-[54px] w-auto max-w-[52px] object-contain"
                          />
                        </div>
                        <div className="flex min-w-0 flex-col gap-1 leading-[1.5]">
                          <p className="whitespace-normal font-jakarta text-[18px] font-medium capitalize leading-[1.5] text-[#141a1f]">
                            {row.name}
                          </p>
                          <p
                            className={`font-jakarta text-[16px] font-normal capitalize leading-[1.5] ${STATUS_TONE[row.statusTone]}`}
                          >
                            {row.status}
                          </p>
                        </div>
                      </div>
                      {row.showReview ? (
                        <span className="shrink-0 font-jakarta text-[18px] font-medium capitalize leading-[1.5] text-[#006dad] whitespace-nowrap">
                          Review
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave.mp4"
      />
    </>
  );
}

function FeatureBlock(
  props: HealthcareClinicalControlsSectionData["features"][number],
) {
  return (
    <div className="flex max-w-[280px] shrink-0 flex-col gap-3">
      <ClinicalControlsSignalIcon />
      <p className="font-jakarta text-base font-bold leading-[1.25] text-[#092131]">
        {props.title}
      </p>
      <p className="font-jakarta text-[13px] font-normal leading-[1.5] text-[#52697a]">
        {props.description}
      </p>
    </div>
  );
}
