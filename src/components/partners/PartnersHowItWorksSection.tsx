import Image from "next/image";
import type { CSSProperties } from "react";
import type { PartnersHowItWorksData } from "@/data/partners-how-it-works";

interface PartnersHowItWorksSectionProps {
  data: PartnersHowItWorksData;
}

/** Figma 1646:1638 — Section frame (px) */
const FW = 1506;
const FH = 1389;

function xp(n: number): string {
  return `${(n / FW) * 100}%`;
}
function yp(n: number): string {
  return `${(n / FH) * 100}%`;
}
function wp(n: number): string {
  return `${(n / FW) * 100}%`;
}

/* ----- Mobile ----- */

function MobileStepIsometricIcon({
  iconSrc,
  title,
}: {
  iconSrc: string;
  title: string;
}) {
  return (
    <div className="relative flex h-[71px] w-[110px] shrink-0 items-center justify-center">
      <Image
        src={iconSrc}
        alt={title}
        width={64}
        height={64}
        className="absolute top-[-10%] left-1/2 z-20 h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 object-contain"
        sizes="64px"
      />
      <div
        className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2"
        style={{
          background: "url(/images/icons/under-cover.svg)",
          width: "100px",
          height: "100px",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image
          className="absolute top-1/2 left-1/2 z-10 w-[60px] -translate-x-1/2 -translate-y-1/2 object-contain"
          src="/images/icons/dot.svg"
          alt=""
          width={40}
          height={52}
          aria-hidden
        />
      </div>
    </div>
  );
}

function PathCubeSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={66}
      viewBox="0 0 64 66"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M41.5522 50.4889L64 37.3542L63.8879 51.9594L41.5522 65.0561L41.5522 50.4889Z"
        fill="#02A1FF"
      />
      <path
        d="M0 26.3711L41.5522 50.4905L41.5522 65.1673L-3.26183e-07 41.1771L0 26.3711Z"
        fill="#006DAD"
      />
      <path
        d="M22.9254 13.236L64 37.3562L41.5522 50.4905L-5.80968e-07 26.3711L22.9254 13.236Z"
        fill="#0087D7"
      />
    </svg>
  );
}

/** Path tile — straight segment (Figma Group 1000009232), top-left = x,y */
function PathTileFlat({ style }: { style?: CSSProperties }) {
  return (
    <div className="pointer-events-none absolute" style={style}>
      <PathCubeSvg className="block h-[65.167px] w-[64px]" />
    </div>
  );
}

/** Path tile — angled A (Figma 9221 / 9226 wrapper) */
function PathTileAngledA({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="absolute flex h-[97.167px] w-[55.426px] items-center justify-center"
      style={style}
    >
      <div
        className="flex-none"
        style={{
          transform: "rotate(-30deg) skewX(-30deg) scaleY(0.87)",
        }}
      >
        <div className="relative h-[65.167px] w-[64px]">
          <PathCubeSvg className="block" />
        </div>
      </div>
    </div>
  );
}

/** Path tile — flipped corner (Figma 9220) */
function PathTileFlipped({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="absolute flex h-[97.167px] w-[55.426px] items-center justify-center"
      style={style}
    >
      <div
        className="flex-none"
        style={{
          transform: "rotate(-150deg) scaleY(0.87) skewX(30deg)",
        }}
      >
        <div className="relative h-[65.167px] w-[64px]">
          <PathCubeSvg className="block" />
        </div>
      </div>
    </div>
  );
}

type StepMarkerConfig = {
  platform: { left: number; top: number; width: number; height: number };
  platformInnerTransform: string;
  shadow: {
    left: number;
    top: number;
    width: number;
    height: number;
    innerTransform: string;
    shadowW: number;
    shadowH: number;
  };
  icon: { left: number; top: number; width: number; height: number };
  /** Step 4 only: object position for raster crop */
  iconImgStyle?: CSSProperties;
};

const STEP_MARKERS: StepMarkerConfig[] = [
  {
    platform: { left: 478, top: 348, width: 173.205, height: 100 },
    platformInnerTransform: "rotate(-30deg) scaleY(0.87) skewX(30deg)",
    shadow: {
      left: 524.71,
      top: 377.82,
      width: 80.396,
      height: 40.359,
      innerTransform: "rotate(-43.79deg) scaleY(0.87) skewX(30deg)",
      shadowW: 35.232,
      shadowH: 57.238,
    },
    icon: { left: 515, top: 315, width: 90, height: 90 },
  },
  {
    platform: { left: 827, top: 565, width: 173.205, height: 100 },
    platformInnerTransform: "rotate(-30deg) scaleY(0.87) skewX(30deg)",
    shadow: {
      left: 883.97,
      top: 600,
      width: 59.885,
      height: 30,
      innerTransform: "rotate(-43.79deg) scaleY(0.87) skewX(30deg)",
      shadowW: 26.114,
      shadowH: 42.732,
    },
    icon: { left: 864, top: 540, width: 100, height: 100 },
  },
  {
    platform: { left: 777, top: 839, width: 173.205, height: 100 },
    platformInnerTransform: "rotate(-30deg) scaleY(0.87) skewX(30deg)",
    shadow: {
      left: 826,
      top: 866,
      width: 76.99,
      height: 39.203,
      innerTransform: "rotate(-17.28deg) scaleY(0.87) skewX(30deg)",
      shadowW: 54.545,
      shadowH: 33.901,
    },
    icon: { left: 820, top: 810, width: 90, height: 90 },
  },
  {
    platform: { left: 574, top: 1145, width: 173.205, height: 100 },
    platformInnerTransform: "rotate(-30deg) scaleY(0.87) skewX(30deg)",
    shadow: {
      left: 628,
      top: 1176,
      width: 65.818,
      height: 38,
      innerTransform: "rotate(-30deg) scaleY(0.87) skewX(30deg)",
      shadowW: 35.232,
      shadowH: 40.768,
    },
    icon: { left: 632, top: 1105, width: 80, height: 80 },
    iconImgStyle: {
      width: "176.55%",
      height: "112.28%",
      left: "-50.86%",
      top: "-2.41%",
      maxWidth: "none",
    },
  },
];

function DesktopStepMarkerLayer({
  iconSrc,
  title,
  config,
}: {
  iconSrc: string;
  title: string;
  config: StepMarkerConfig;
}) {
  const { platform, platformInnerTransform, shadow, icon, iconImgStyle } =
    config;

  return (
    <>
      {/* Isometric platform (ellipse asset → gradient + transform) */}
      <div
        className="pointer-events-none absolute z-20 flex items-center justify-center"
        style={{
          left: xp(platform.left),
          top: yp(platform.top),
          width: wp(platform.width),
          height: `${(platform.height / FH) * 100}%`,
        }}
      >
        <div
          className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2"
          style={{
            background: "url(/images/icons/under-cover.svg)",
            width: "80px",
            height: "80px",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src="/images/icons/dot.svg"
            alt=""
            width={40}
            height={40}
            className="absolute top-1/2 left-1/2 z-10 w-[40px] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>
      {/* Ground shadow under icon */}
      <div
        className="pointer-events-none absolute z-30 flex items-center justify-center"
        style={{
          left: xp(shadow.left),
          top: yp(shadow.top),
          width: wp(shadow.width),
          height: `${(shadow.height / FH) * 100}%`,
        }}
      >
        <div className="flex-none" style={{ transform: shadow.innerTransform }}>
          <div
            className="relative overflow-visible"
            style={{ width: shadow.shadowW, height: shadow.shadowH }}
          >
            <div
              className="absolute rounded-[50%]"
              style={{
                inset: "-20% -32%",
                background:
                  "radial-gradient(ellipse at 50% 35%, rgba(0,56,89,0.35) 0%, rgba(0,56,89,0.12) 45%, transparent 72%)",
                filter: "blur(2.5px)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Step icon */}
      <div
        className="pointer-events-none absolute z-40 overflow-hidden"
        style={{
          left: xp(icon.left),
          top: yp(icon.top),
          width: wp(icon.width),
          height: wp(icon.height),
        }}
      >
        <Image
          src={iconSrc}
          alt={title}
          width={icon.width}
          height={icon.height}
          className="absolute inset-0 size-full object-contain"
          // sizes="120px"
          style={iconImgStyle}
        />
      </div>
    </>
  );
}

export default function PartnersHowItWorksSection({
  data,
}: PartnersHowItWorksSectionProps) {
  const { badge, heading, steps } = data;

  return (
    <section className="relative z-10 w-full overflow-hidden bg-white pb-8 lg:pb-40">
      <div className="container relative">
        {/* Mobile header */}
        <div className="mx-auto mb-16 flex lg:max-w-[353px] flex-col items-center gap-2 lg:hidden">
          <div
            className="flex h-8 items-center justify-center rounded-full border px-5"
            style={{
              backgroundColor: "#F0F6F9",
              borderColor: "rgba(0, 56, 89, 0.1)",
            }}
          >
            <p className="font-jakarta text-[12px] font-bold leading-[18px] tracking-[0.84px] text-[#003859]">
              {badge}
            </p>
          </div>
          <h2 className="w-full text-center font-jakarta text-[32px] font-extrabold leading-[1.2] tracking-[-0.8px] text-[#003859]">
            <span className="block">{heading.line1.trimEnd()}</span>
            <span className="block text-[#0087D7]">{heading.line2}</span>
            <span className="block">{heading.line3.trimStart()}</span>
          </h2>
        </div>

        {/* Desktop — pixel canvas 1506×1389 (Figma); scales with container width */}
        <div className="relative mx-auto hidden w-full max-w-[1506px] lg:block ">
          <div
            className="relative w-full bg-white"
            style={{ aspectRatio: `${FW} / ${FH}` }}
          >
            {/* Path under copy — z-0 */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              aria-hidden
            >
              <PathTileFlat style={{ left: xp(609), top: yp(405) }} />
              <PathTileFlat style={{ left: xp(673), top: yp(442) }} />
              <PathTileFlat style={{ left: xp(734), top: yp(479) }} />
              <PathTileFlat style={{ left: xp(796), top: yp(520) }} />
              {/* <PathTileFlipped style={{ left: xp(931), top: yp(614) }} /> */}
              <PathTileFlat style={{ left: xp(920), top: yp(625) }} />
              <PathTileAngledA style={{ left: xp(931), top: yp(662) }} />
              <PathTileAngledA style={{ left: xp(909), top: yp(713) }} />
              <PathTileAngledA style={{ left: xp(876), top: yp(765) }} />
              <PathTileAngledA style={{ left: xp(804), top: yp(889) }} />
              <PathTileAngledA style={{ left: xp(777), top: yp(933) }} />
              <PathTileAngledA style={{ left: xp(746), top: yp(977) }} />
              <PathTileAngledA style={{ left: xp(712), top: yp(1025) }} />
              <PathTileAngledA style={{ left: xp(684), top: yp(1073) }} />
            </div>

            {/* Header — 1658:3254 */}
            <div
              className="flex text-center justify-center z-10 flex-col items-center gap-2 "
              // style={{
              //   left: xp(214),
              //   top: yp(60),
              //   width: wp(1024),
              // }}
            >
              <div
                className="relative flex h-8 shrink-0 items-center justify-center rounded-full border px-4 "
                style={{
                  width: "135.797px",
                  maxWidth: "100%",
                  backgroundColor: "#F0F6F9",
                  borderColor: "rgba(0, 56, 89, 0.1)",
                }}
              >
                <p className="font-jakarta text-[12px] font-bold leading-[18px] tracking-[0.84px] text-[#003859]">
                  {badge}
                </p>
              </div>
              <div className="flex w-full flex-col items-center text-center font-jakarta text-[42px] font-extrabold tracking-[-1.05px] text-[#003859] ">
                <p className="w-full leading-[48.3px]">
                  <span>{heading.line1}</span>
                  <span className="text-[#0087D7]">{heading.line2}</span>
                </p>
                <p className="w-full leading-[48.3px]">
                  {heading.line3.trimStart()}
                </p>
              </div>
            </div>

            {/* STEP 01 copy */}
            <div
              className="absolute z-10 flex flex-col gap-1 text-right "
              style={{
                left: xp(280),
                top: yp(306),
                // width: wp(197.125),
              }}
            >
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[0].label}
              </p>
              <p className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859] w-full">
                {steps[0].title}
              </p>
            </div>
            <p
              className="absolute z-10 text-left  mt-4 font-jakarta text-[14px] font-normal leading-[25.2px] text-[#52697A]"
              style={{
                left: xp(210),
                top: yp(361),
                width: wp(310),
              }}
            >
              {steps[0].description}
            </p>

            {/* STEP 02 */}
            <div
              className="absolute z-10 flex flex-col gap-1 text-left"
              style={{
                left: xp(980),
                top: yp(537),
              }}
            >
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[1].label}
              </p>
              <p className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[1].title}
              </p>
            </div>
            <p
              className="absolute  mt-4  z-10 text-left font-jakarta text-[14px] font-normal leading-[25.2px] text-[#52697A]"
              style={{
                left: xp(1020),
                top: yp(592),
                width: wp(350),
              }}
            >
              {steps[1].description}
            </p>

            {/* STEP 03 */}
            <div
              className="absolute z-10 flex flex-col gap-1 text-right"
              style={{
                left: xp(490),
                top: yp(788),
                // width: wp(280),
              }}
            >
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[2].label}
              </p>
              <p className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[2].title}
              </p>
            </div>
            <p
              className="absolute z-10 mt-4 text-left font-jakarta text-[14px] font-normal leading-[25.2px] text-[#52697A]"
              style={{
                left: xp(432),
                top: yp(843),
                width: wp(344),
              }}
            >
              {steps[2].description}
            </p>

            {/* STEP 04 */}
            <div
              className="absolute z-10 flex flex-col gap-1 text-right"
              style={{
                left: xp(400),
                top: yp(1105),
                // width: wp(174),
              }}
            >
              <p className="whitespace-nowrap font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[3].label}
              </p>
              <p className="min-w-full font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[3].title}
              </p>
            </div>
            <p
              className="absolute z-10 mt-4 text-left font-jakarta text-[14px] font-normal leading-[25.2px] text-[#52697A]"
              style={{
                left: xp(230),
                top: yp(1160),
                width: wp(350),
              }}
            >
              {steps[3].description}
            </p>

            {/* Step markers (platform + shadow + icon) */}
            {steps.slice(0, 4).map((step, i) => (
              <DesktopStepMarkerLayer
                key={step.id}
                iconSrc={step.icon}
                title={step.title}
                config={STEP_MARKERS[i]!}
              />
            ))}

            <span className="sr-only">How partnership steps work</span>
          </div>
        </div>

        {/* Mobile steps */}
        <div className="mx-auto flex w-full max-w-[353px] md:max-w-[55%] flex-col gap-[50px] lg:hidden">
          {steps.map((step, index) => {
            const textOnLeft = index % 2 === 0;
            const headerBlock = (
              <div
                className={`flex min-w-0 flex-1 flex-col gap-1 ${
                  textOnLeft ? "items-end text-right" : "items-start text-left"
                }`}
              >
                <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                  {step.label}
                </p>
                <h3 className="font-jakarta text-[18px] font-bold leading-snug text-[#003859]">
                  {step.title}
                </h3>
              </div>
            );
            const iconBlock = (
              <MobileStepIsometricIcon iconSrc={step.icon} title={step.title} />
            );

            return (
              <div key={step.id} className="flex w-full flex-col gap-0">
                <div className="flex w-full items-start gap-3">
                  {textOnLeft ? (
                    <>
                      {headerBlock}
                      {iconBlock}
                    </>
                  ) : (
                    <>
                      {iconBlock}
                      {headerBlock}
                    </>
                  )}
                </div>
                <p className="mt-[13px] max-w-[250px] font-jakarta text-[14px] font-normal leading-normal text-[#52697A]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
