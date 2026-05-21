import Image from "next/image";
import type { FinancialTelemetryFabricSectionData } from "@/types/industry-page";

const ART_W = 664;
const ART_H = 666;
const BRAND_CYAN = "#02a1ff";

function pctW(px: number) {
  return `${(px / ART_W) * 100}%`;
}

function pctH(px: number) {
  return `${(px / ART_H) * 100}%`;
}

/** Concentric telemetry rings + dashed flows — specs from `2889:7841`. */
function TelemetryFabricIllustrationArt() {
  const cx = 331.5;
  const cy = 313.5;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${ART_W} ${ART_H}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx={cx}
        cy={cy}
        r={171.5}
        fill="none"
        stroke={BRAND_CYAN}
        strokeWidth="6"
      />
      <circle
        cx={cx}
        cy={cy}
        r={132.5}
        fill="none"
        stroke={BRAND_CYAN}
        strokeWidth="4"
      />
      <circle
        cx={cx}
        cy={cy}
        r={79.5}
        fill="none"
        stroke={BRAND_CYAN}
        strokeWidth="4"
      />
      {/* dashed vertical feeders — rects from `2889:7843–2889:7846` */}
      <line
        x1="196.826"
        y1="211.48"
        x2="196.826"
        y2="331.317"
        stroke={BRAND_CYAN}
        strokeWidth="1"
        strokeDasharray="10 10"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="196.826"
        y1="416.23"
        x2="196.826"
        y2="540.827"
        stroke={BRAND_CYAN}
        strokeWidth="1"
        strokeDasharray="10 10"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="461.782"
        y1="217.945"
        x2="461.782"
        y2="327.625"
        stroke={BRAND_CYAN}
        strokeWidth="1"
        strokeDasharray="10 10"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="461.782"
        y1="412.344"
        x2="461.782"
        y2="523.782"
        stroke={BRAND_CYAN}
        strokeWidth="1"
        strokeDasharray="10 10"
        vectorEffect="non-scaling-stroke"
      />
      {/* spine — `2889:7842` */}
      <line
        x1="331"
        y1="338"
        x2="331"
        y2="531"
        stroke={BRAND_CYAN}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Matches Figma “Signal icon” (34 × 34, inset bars). */
function SignalIconFabric() {
  return (
    <div
      className="flex h-[34px] w-[34px] shrink-0 items-end justify-center gap-1 rounded-[10px] border border-[#cfe5ec] bg-white px-2 pb-2 pt-1"
      aria-hidden
    >
      <span className="h-2 w-1 shrink-0 rounded-[2px] bg-[#003859]" />
      <span className="h-[13px] w-1 shrink-0 rounded-[2px] bg-[#003859]" />
      <span className="h-[18px] w-1 shrink-0 rounded-[2px] bg-[#003859]" />
    </div>
  );
}

interface FinancialTelemetryFabricSectionProps {
  data: FinancialTelemetryFabricSectionData;
}

/**
 * Full-width band from Figma `2884:8332` (“Section / Banking cybersecurity”):
 * white surface, telemetry illustration card + copy column + logos.
 */
export default function FinancialTelemetryFabricSection({
  data,
}: FinancialTelemetryFabricSectionProps) {
  const { illustrationCard, headline, paragraphs, features, partnerLogos } =
    data;
  const [featureLeft, featureRight] = features;
  const [logoA, logoB, logoC] = partnerLogos;

  return (
    <section
      className="w-full bg-white pb-16 xl:pb-[180px] z-10"
      aria-labelledby="financial-telemetry-headline"
    >
      <div className="mx-auto w-full max-w-[1506px] px-6 md:px-10 xl:px-[97px]">
        {/* Row Frame 2884:8333 — gap 24, max logical width 1312 */}
        <div className="mx-auto flex max-w-[1312px] flex-col gap-6 lg:flex-row lg:justify-between xl:gap-[24px]">
          {/* Illustration `2889:7841` */}
          <div className="relative mx-auto w-full max-w-[664px] shrink-0 lg:mx-0">
            <div className="relative lg:aspect-664/666 overflow-hidden rounded-[30px] bg-[#e7f6ff]">
              <div className="relative z-10 px-[clamp(28px,_6.3vw,_42px)] pb-8 pt-[clamp(31px,_6.3vw,_42px)]">
                <div className="flex max-w-[580px] flex-col gap-[6px] text-[#006dad]">
                  <p className="font-jakarta text-[clamp(22px,2.6vw,28px)] font-bold leading-[34px] xl:text-[28px]">
                    {illustrationCard.title}
                  </p>
                  <p className="min-h-[40px] max-w-[580px] font-jakarta text-[13px] font-normal leading-[20px] sm:text-[14px] lg:line-clamp-none">
                    {illustrationCard.subtitle}
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <Image
                  src="/images/industries/section-financial-cybersecurity/telemetry-fabric.svg"
                  alt="Telemetry Fabric Badge"
                  width={90}
                  height={38}
                  className="h-auto  lg:w-1/2 mx-auto object-contain mt-4 w-full"
                />
              </div>
            </div>
          </div>

          <div className="relative flex min-w-0 flex-1 flex-col lg:w-[624px] lg:max-w-[624px] lg:flex-none">
            <div className="flex flex-col gap-6 xl:gap-6">
              <div className="flex flex-col gap-4">
                <h2
                  id="financial-telemetry-headline"
                  className="font-jakarta text-[clamp(28px,_5vw,_40px)] font-bold leading-none tracking-[0em] text-[#003859] xl:text-[40px] xl:leading-[44px]"
                >
                  {headline}
                </h2>
                <div className="flex flex-col gap-5 font-jakarta text-[clamp(17px,_1.05vw,_18px)] font-normal leading-[1.556] tracking-[0em] text-[#526879] xl:text-[18px] xl:leading-[1.56] [&>p]:text-pretty">
                  {paragraphs.map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Frame 2884:8384 — row h138, cols y-offset ~10 */}
              <div className="flex flex-col gap-[12px] pt-3 sm:flex-row sm:justify-between sm:gap-16 xl:pt-[10px]">
                <div className="flex max-w-[280px] flex-col gap-[12px]">
                  <SignalIconFabric />
                  <p className="font-jakarta text-base font-bold leading-5 tracking-[0em] text-[#092131]">
                    {featureLeft.title}
                  </p>
                  <p className="font-jakarta text-[13px] font-normal leading-5 tracking-[0em] text-[#52697a]">
                    {featureLeft.description}
                  </p>
                </div>
                <div className="flex max-w-[280px] flex-col gap-[12px]">
                  <SignalIconFabric />
                  <p className="font-jakarta text-base font-bold leading-5 tracking-[0em] text-[#092131]">
                    {featureRight.title}
                  </p>
                  <p className="font-jakarta text-[13px] font-normal leading-5 tracking-[0em] text-[#52697a]">
                    {featureRight.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Logos Frame 2884:8399 — y gap ≈106 from block above */}
            <div className="mt-[72px] flex w-full flex-wrap items-center gap-x-[129px] gap-y-8 pt-[6px] lg:gap-y-10 xl:mt-[106px] xl:justify-start">
              {[
                { logo: logoA, key: "a" },
                { logo: logoB, key: "b" },
                { logo: logoC, key: "c" },
              ].map(({ logo, key }) => (
                <div
                  key={key}
                  className="relative flex h-[55px] shrink-0 items-center justify-start"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={100}
                    className="max-h-[55px] w-auto   object-contain object-bottom"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
