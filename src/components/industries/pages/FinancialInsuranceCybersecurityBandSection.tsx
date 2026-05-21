import { SectionVideoSeparator } from "@/components/ui/SectionVideoSeparator";
import type { InsuranceCybersecurityBandData } from "@/types/industry-page";
import Image from "next/image";

/** Figma `2900:12550`: 24 × 24 pill, bg `rgb(0,135,215)` rounded full. */
function CheckBulbCircle() {
  return (
    <div
      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0087d7]"
      aria-hidden
    >
      <svg
        width={13}
        height={13}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="m3.67 7.58 2.06 2.29 5.43-6.28"
          stroke="#fff"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Lightweight stand-in for Figma vectors `2900:12569–2900:12584` —
 * layered stroke blocks + accent chips; swap with exported SVG asset if desired.
 */
function ClaimsVaultGraphic() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 476 426"
      fill="none"
      className="block h-auto w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <ellipse
        cx={238}
        cy={213}
        rx={209}
        ry={167}
        stroke="#0087d7"
        strokeWidth={17}
        opacity={0.18}
      />
      <ellipse
        cx={238}
        cy={213}
        rx={173}
        ry={143}
        stroke="#0087d7"
        strokeWidth={13}
        opacity={0.32}
      />
      <ellipse
        cx={238}
        cy={218}
        rx={135}
        ry={117}
        stroke="#0087d7"
        strokeWidth={11}
        opacity={0.55}
      />
      <ellipse
        cx={238}
        cy={226}
        rx={105}
        ry={93}
        stroke="#0087d7"
        strokeWidth={10}
        opacity={0.78}
      />
      <rect
        x={38}
        y={351}
        width={34}
        height={51}
        rx={6}
        fill="#fefefe"
        opacity={0.95}
      />
      <rect
        x={0}
        y={24}
        width={48}
        height={43}
        rx={8}
        fill="#fefefe"
        opacity={0.92}
      />
      <rect
        x={429}
        y={44}
        width={46}
        height={46}
        rx={10}
        fill="#fefefe"
        opacity={0.92}
      />
      <rect x={179} y={180} width={40} height={37} rx={6} fill="#fefefe" />
      <rect x={201} y={226} width={62} height={37} rx={6} fill="#fefefe" />
      <rect x={239} y={180} width={46} height={37} rx={6} fill="#fefefe" />
    </svg>
  );
}

interface FinancialInsuranceCybersecurityBandSectionProps {
  data: InsuranceCybersecurityBandData;
}

/**
 * Full-width band from Figma `2900:12540`:
 * prose + 2×2 checklist (gap-y 34, gap-x 64), white claims-vault illustration card (`2900:12565`).
 */
export default function FinancialInsuranceCybersecurityBandSection({
  data,
}: FinancialInsuranceCybersecurityBandSectionProps) {
  const { headline, body, checklist, illustrationCard } = data;
  const [a, b, c, d] = checklist;

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />{" "}
      <section
        className="w-full bg-white py-16 xl:py-[100px]"
        aria-labelledby="insurance-cyber-headline"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="container mx-auto w-full   ">
          <div className="mx-auto flex max-w-[1312px] flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-[24px]">
            <div className="relative order-2 flex w-full flex-col xl:order-none xl:w-[624px] xl:max-w-[624px] xl:flex-none xl:gap-0 xl:justify-start">
              <div className="flex flex-col gap-4 xl:gap-4">
                <h2
                  id="insurance-cyber-headline"
                  className="font-jakarta text-[clamp(28px,5vw,40px)] font-bold tracking-[0em] text-[#003859] xl:text-[40px] xl:leading-[44px]"
                >
                  {headline}
                </h2>
                <p className="max-w-[608px] pr-4 font-jakarta text-[clamp(17px,1.05vw,18px)] font-normal leading-[1.556] text-[#526879] xl:pr-[16px] xl:text-[18px] xl:leading-[1.56]">
                  {body}
                </p>
              </div>

              <div className="mt-16 xl:mt-[100px]">
                <div className="grid max-w-[624px] grid-cols-1 gap-x-[64px] gap-y-[34px] sm:grid-cols-2">
                  {[a, b, c, d].map((label) => (
                    <div
                      key={label}
                      className="flex max-w-[320px] items-start gap-2 xl:gap-2"
                    >
                      <CheckBulbCircle />
                      <p className="min-h-[24px] font-jakarta text-base font-bold leading-5 tracking-[0em] text-[#092131]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
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
                    src="/images/industries/section-insurance-cyber-headline/insurance-cyber-headline.svg"
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
