import Image from "next/image";
import type { BankingCybersecuritySectionData } from "@/types/industry-page";
import { SectionVideoSeparator } from "@/components/ui/SectionVideoSeparator";

function BankingSignalIcon() {
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

interface FinancialBankingCybersecuritySectionProps {
  data: BankingCybersecuritySectionData;
}

const CHECK_16_SRC = "/images/icons/check-fi-sr-16.svg";

/** Matches Figma frame `2876:7909` (“Illustration / banking control proof”) — coords from y=198 (Regulator label top). */
const PROOF_DIAGRAM_Y0 = 198;
const FLOW_STROKE = "#02a1ff";

/** Outer illustration width — all Figma `x` positions are normalized to this. */
const PROOF_ARTBOARD_W = 664;

/**
 * Visible diagram stack height aligned to Figma dashed stem bottom:
 * illustration y=510 → shifted by `PROOF_DIAGRAM_Y0`.
 */
const PROOF_DIAGRAM_H = 510 - PROOF_DIAGRAM_Y0;

function pctW(px: number) {
  return `${(px / PROOF_ARTBOARD_W) * 100}%`;
}

function pctH(px: number) {
  return `${(px / PROOF_DIAGRAM_H) * 100}%`;
}

export default function FinancialBankingCybersecuritySection({
  data,
}: FinancialBankingCybersecuritySectionProps) {
  const { heading, paragraphs, features, partnerLogos, proofCard } = data;
  const [featureA, featureB] = features;

  const regulatorItems = proofCard.regulatorColumn.items;
  const customerItems = proofCard.customerColumn.items;

  const regRows =
    regulatorItems.length === 3
      ? regulatorItems.map((text, i) => ({
          text,
          left: [101, 66, 36][i]!,
          top: [229, 254, 279][i]! - PROOF_DIAGRAM_Y0,
        }))
      : regulatorItems.map((text, i) => ({
          text,
          left: 101 - i * 35,
          top: 31 + i * 25,
        }));

  const custRows =
    customerItems.length === 3
      ? customerItems.map((text, i) => ({
          text,
          left: [475, 443, 397][i]!,
          top: [231, 259, 287][i]! - PROOF_DIAGRAM_Y0,
          boxW: [123, 120, 158][i]!,
        }))
      : customerItems.map((text, i) => ({
          text,
          left: 475 - i * 78,
          top: 33 + i * 28,
          boxW: 140,
        }));

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />{" "}
      <section
        className="relative w-full overflow-hidden py-16 xl:py-24"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="container flex   items-center justify-between gap-6">
          <div className="flex w-full lg:w-1/2 flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:gap-6">
            <div className="flex flex-col gap-8 lg:justify-between lg:gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h2
                    id="banking-cyber-heading"
                    className="font-jakarta text-[clamp(28px,4vw,40px)] font-bold capitalize leading-[1.1] text-[#003859]"
                  >
                    {heading}
                  </h2>
                  <div className="space-y-4 pr-0 font-jakarta text-lg font-normal leading-[1.56] text-[#52697a] lg:pr-4">
                    {paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:h-auto lg:justify-between">
                  <div className="flex max-w-[280px] flex-col gap-3">
                    <BankingSignalIcon />
                    <p className="font-jakarta text-base font-bold leading-tight text-[#092131]">
                      {featureA.title}
                    </p>
                    <p className="font-jakarta text-[13px] font-normal leading-normal text-[#52697a]">
                      {featureA.description}
                    </p>
                  </div>
                  <div className="flex max-w-[280px] flex-col gap-3">
                    <BankingSignalIcon />
                    <p className="font-jakarta text-base font-bold leading-tight text-[#092131]">
                      {featureB.title}
                    </p>
                    <p className="font-jakarta text-[13px] font-normal leading-normal text-[#52697a]">
                      {featureB.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-8   pt-6 lg:mt-12   lg:pt-4 lg:pr-6">
                {partnerLogos.map((logo, idx) => (
                  <div
                    key={`${logo.src}-${idx}`}
                    className="relative flex h-[55px] items-center justify-center"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={100}
                      className="max-h-[55px] w-auto object-contain object-bottom  "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Proof card */}
          <div className="relative w-full lg:w-1/2 shrink-0   lg:flex-1">
            <div
              className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[30px]   shadow-[0px_26px_44px_-18px_rgba(0,56,89,0.06)] xl:min-h-[666px]"
              style={{
                background:
                  "linear-gradient(180deg, #fff 70%, transparent 100%)",
              }}
            >
              {/* Header — Figma: inner title frame at inset 42×42; subtitle block h 40; title/subtitle gap 6px */}
              <div className="relative z-10 px-8 pt-10 xl:px-[41px] xl:pt-[41px]">
                <div className="flex max-w-[580px] flex-col gap-[6px] text-[#006dad]">
                  <p className="font-jakarta text-[clamp(22px,2.6vw,28px)] font-bold leading-[34px] xl:text-[28px]">
                    {proofCard.title}
                  </p>
                  <p className="line-clamp-2 min-h-[40px] max-w-[580px] font-jakarta text-[13px] font-normal leading-[20px] text-[#006dad] sm:text-[14px]">
                    {proofCard.subtitle}
                  </p>
                </div>

                {/* Figma: subtitle block bottom → Regulator headline top = 76px */}
                <div
                  className="hidden h-[76px] shrink-0 lg:block"
                  aria-hidden
                />
              </div>

              {/* Desktop diagram — pinned to `2876:7909`; HTML positions use pct so it scales with the 664px artboard */}
              <div className="relative z-10 mx-auto mb-8 hidden px-8 xl:mx-0 xl:mb-[13px] xl:max-w-none   lg:block">
                <div className="relative mx-auto aspect-[664/312] w-full max-w-[664px]">
                  {/* flow lines — dash pattern 10/10 */}
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-[length:initial]"
                    viewBox={`0 0 ${PROOF_ARTBOARD_W} ${PROOF_DIAGRAM_H}`}
                    preserveAspectRatio="xMidYMid meet"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Horizontal dashed T-arm — (191, 211, 280×1); y′ = 211 − 198 */}
                    <line
                      x1="191"
                      y1="13.5"
                      x2="471"
                      y2="13.5"
                      stroke={FLOW_STROKE}
                      strokeDasharray="10 10"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      shapeRendering="crispEdges"
                    />
                    {/* Vertical dashed stem — starts y=213: y′=15 */}
                    <line
                      x1="332"
                      y1="15"
                      x2="332"
                      y2={String(PROOF_DIAGRAM_H)}
                      stroke={FLOW_STROKE}
                      strokeDasharray="10 10"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      shapeRendering="crispEdges"
                    />
                  </svg>

                  <p
                    className="absolute whitespace-nowrap font-jakarta text-[18px] font-extrabold leading-[22px] text-[#006dad]"
                    style={{ left: pctW(101), top: pctH(0) }}
                  >
                    {proofCard.regulatorColumn.heading}
                  </p>
                  <p
                    className="absolute whitespace-nowrap font-jakarta text-[18px] font-extrabold leading-[22px] text-[#006dad]"
                    style={{
                      left: pctW(475),
                      width: pctW(88),
                      top: pctH(2),
                    }}
                  >
                    {proofCard.customerColumn.heading}
                  </p>

                  {regRows.map((row, idx) => (
                    <div
                      key={`reg-${idx}`}
                      className="absolute flex h-[16px] items-center gap-[12px] mt-2"
                      style={{
                        left: pctW(row.left),
                        top: pctH(row.top),
                      }}
                    >
                      <Image
                        src={CHECK_16_SRC}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 shrink-0"
                      />
                      <span className="whitespace-nowrap font-jakarta text-[13px] font-normal leading-4 tracking-[0em] text-[#003859]">
                        {row.text}
                      </span>
                    </div>
                  ))}

                  {custRows.map((row, idx) => (
                    <div
                      key={`cust-${idx}`}
                      className="absolute flex h-[16px] items-center gap-[4px] mt-2"
                      style={{
                        left: pctW(row.left),
                        top: pctH(row.top),
                        width: pctW(row.boxW),
                      }}
                    >
                      <Image
                        src={CHECK_16_SRC}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 shrink-0"
                      />
                      <span className="whitespace-nowrap text-left font-jakarta text-[13px] font-medium leading-4 tracking-[0em] text-[#003859]">
                        {row.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile / tablet stacking (Figma illustration is desktop fixed-width) */}
              <div className="relative z-10 flex-1 px-4 pb-0 pt-8 sm:px-8 xl:px-[41px] lg:hidden">
                <div className="relative mx-auto grid max-w-[664px] grid-cols-1 gap-10">
                  <div className="relative">
                    <p className="mb-5 font-jakarta text-[18px] font-extrabold leading-[22px] text-[#006dad]">
                      {proofCard.regulatorColumn.heading}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {proofCard.regulatorColumn.items.map((item, i) => (
                        <li
                          key={item}
                          className={`flex items-center gap-3 font-jakarta text-[13px] font-normal leading-tight text-[#003859] ${i === 1 ? "ms-3 sm:ms-4" : ""} ${i === 2 ? "ms-6 sm:ms-8" : ""}`}
                        >
                          <Image
                            src={CHECK_16_SRC}
                            alt=""
                            width={16}
                            height={16}
                            className="shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative">
                    <p className="mb-5 font-jakarta text-[18px] font-extrabold leading-[22px] text-[#006dad]">
                      {proofCard.customerColumn.heading}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {proofCard.customerColumn.items.map((item, i) => (
                        <li
                          key={item}
                          className={`flex items-center gap-1 font-jakarta text-[13px] font-medium leading-tight text-[#003859] ${i === 1 ? "ms-3 sm:ms-4" : ""} ${i === 2 ? "ms-6 sm:ms-8" : ""}`}
                        >
                          <Image
                            src={CHECK_16_SRC}
                            alt=""
                            width={16}
                            height={16}
                            className="shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer — Figma caption at (189,572) w286; ~3px under GRC row */}
              <div className="relative z-10 mt-5 flex flex-col items-center px-6 pb-10 pt-[3px] xl:pb-10 xl:px-[41px]">
                <div className="flex items-baseline gap-0">
                  <div className="relative h-[38px] w-[90px] shrink-0 rounded-sm">
                    <Image
                      src={proofCard.grcBadgeSrc}
                      alt={proofCard.grcBadgeAlt}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <span className="font-jakarta text-[24px] font-bold leading-[35px] text-[#003859]">
                    {proofCard.grcLabel}
                  </span>
                </div>
                <p className="mt-[3px] max-w-[286px] text-center font-jakarta text-[13px] font-normal leading-[1.4615] text-[#003859]">
                  {proofCard.footerCaption}
                </p>
              </div>

              <div
                className="pointer-events-none absolute -bottom-8 left-1/2 h-[39px] w-[min(854px,_calc(100%+200px))] max-w-none -translate-x-1/2 rounded-[140px] bg-[#81d0ff] opacity-55 blur-[45px]"
                aria-hidden
              />
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
