import { SectionVideoSeparator } from "@/components/ui/SectionVideoSeparator";
import type {
  HealthcareRegulatorCardData,
  HealthcareRegulatorsSectionData,
} from "@/types/industry-page";
import Image from "next/image";

/** Illustration canvas — Figma `2928:8058` precise height. */
const CARD_W = 664;
const CARD_H = 759.4434204101562;

/** Inner artboard `3008:27987`; points use local coords, then shifted by (-64, +173). */
const MAP_LOCAL_X_OFF = -64;
const MAP_LOCAL_Y_OFF = 173;

/** Dashed connectors — RGB from Figma stroke on `2939:9076` etc. (#57C1FF) */
const FLOW_STROKE = "rgb(87,193,255)";
const FLOW_WEIGHT = 3;
const FLOW_DASH = "6 6";

/** Full-width credential tray in Figma (`2938:9043`, spills slightly past illustration width). */
const STRIP_CARD_W = 695.8666381835938;

function pctW(px: number) {
  return `${(px / CARD_W) * 100}%`;
}

function pctH(py: number) {
  return `${(py / CARD_H) * 100}%`;
}

/** Map card title → icon asset (`iconVariant` is only frame sizing). */
function regulatorIconForTitle(title: string): { src: string; alt: string } {
  const t = title.toLowerCase().trim();

  if (t.includes("hipaa")) {
    return {
      src: "/images/industries/icons/HIPAA.svg",
      alt: "HIPAA compliance",
    };
  }
  if (t.includes("gdpr")) {
    return { src: "/images/industries/icons/GDPR.svg", alt: "GDPR" };
  }
  if (t.includes("moh")) {
    return {
      src: "/images/industries/icons/moh-ksa.svg",
      alt: "Ministry of Health — Kingdom of Saudi Arabia",
    };
  }
  if (t.includes("scfhs")) {
    return {
      src: "/images/industries/icons/scfhs.svg",
      alt: "Saudi Commission for Health Specialties",
    };
  }
  if (t.includes("13485") || t.includes("62304")) {
    return {
      src: "/images/industries/icons/iso-13485-62304.svg",
      alt: "ISO 13485 and IEC 62304",
    };
  }
  if (t.includes("27001")) {
    return {
      src: "/images/industries/icons/iso-27001.svg",
      alt: "ISO/IEC 27001",
    };
  }
  if (t.includes("fda")) {
    return {
      src: "/images/industries/icons/fda.svg",
      alt: "U.S. Food and Drug Administration",
    };
  }

  return { src: "/images/industries/icons/HIPAA.svg", alt: title };
}

/** Chip frames from Figma (`2935:8792` … `2935:8914`). */
function regulatorIconFrame(
  variant?: HealthcareRegulatorCardData["iconVariant"],
): {
  wrapperClassName: string;
  imgWidth: number;
  imgHeight: number;
  imgClassName: string;
} {
  switch (variant) {
    case "fda":
      return {
        wrapperClassName: "flex h-[34px] w-[64px]",
        imgWidth: 48,
        imgHeight: 18,
        imgClassName: "h-[18px] w-auto max-w-[48px] object-contain",
      };
    case "tall":
      return {
        wrapperClassName: "flex h-[42.82px] w-[43.36px]",
        imgWidth: 34,
        imgHeight: 34,
        imgClassName: "h-[28px] w-[28px] object-contain",
      };
    case "wide":
      return {
        wrapperClassName: "flex h-[42.82px] w-[43.36px]",
        imgWidth: 34,
        imgHeight: 34,
        imgClassName: "h-[28px] w-[28px] object-contain",
      };
    default:
      /* compact (+ legacy HIPAA/gdpr keys only used as size hints) */
      return {
        wrapperClassName: "flex h-[42.82px] w-[43.36px]",
        imgWidth: 34,
        imgHeight: 34,
        imgClassName: "h-[28px] w-[28px] object-contain",
      };
  }
}

function RegulatorIconBadge({ card }: { card: HealthcareRegulatorCardData }) {
  const v = card.iconVariant ?? "compact";
  const { src, alt } = regulatorIconForTitle(card.title);
  const frame = regulatorIconFrame(v);

  return (
    <div
      className={`${frame.wrapperClassName} shrink-0 items-center justify-center rounded-[10px] border border-[#e7eef4] bg-white p-2`}
    >
      <Image
        src={src}
        alt={alt}
        width={frame.imgWidth}
        height={frame.imgHeight}
        className={frame.imgClassName}
      />
    </div>
  );
}

function HealthcareRegulatorCard({
  card,
}: {
  card: HealthcareRegulatorCardData;
}) {
  const v = card.iconVariant ?? "compact";
  const iconGap =
    v === "fda" || v === "tall" || v === "wide" ? "gap-3" : "gap-2";
  const titleGap = "gap-1";

  return (
    <div className="flex w-[280px] max-w-full shrink-0 flex-col">
      <div className={`flex flex-col ${iconGap}`}>
        <RegulatorIconBadge card={card} />
        <div className={`flex flex-col ${titleGap}`}>
          <p className="font-jakarta text-[16px] font-bold leading-5 tracking-[0em] text-[#092131]">
            {card.title}
          </p>
          <p className="font-jakarta text-[13px] font-normal leading-5 tracking-[0em] text-[#526879]">
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function CredentialStripGraphic() {
  const stripCardTop = MAP_LOCAL_Y_OFF + 201;
  const stripCardLeft = 0;
  const pad = 16;
  const gap = 80;
  const slots = [
    { w: 120, h: 92 },
    { w: 69.27153015136719, h: 92 },
    { w: 118.55330657958984, h: 92 },
    { w: 116.04180908203125, h: 92 },
  ] as const;

  return (
    <div
      className="absolute z-4 flex h-[124px] border border-[#e7eef4] bg-[#f8fcfe]"
      style={{
        left: pctW(stripCardLeft),
        top: pctH(stripCardTop),
        /** Parent uses `overflow-hidden`; width &gt; 664 matches Figma bleed. */
        width: pctW(STRIP_CARD_W),
      }}
    >
      <div
        className="box-border flex h-full w-full shrink-0 flex-nowrap items-start"
        style={{ padding: pad, gap }}
      >
        {slots.map((s, i) => (
          <div
            key={i}
            className="rounded-lg bg-[#0087d7]/13"
            style={{ width: s.w, height: s.h }}
          />
        ))}
      </div>
    </div>
  );
}

/** Node thumbnails — Frames `2937:8988` etc. mapped to card. */
function MapNodeChipsGraphic() {
  const nodesLocal = [
    { x: 85, y: 60, w: 65, h: 65 },
    { x: 330, y: 60, w: 64.92410278320312, h: 65 },
    { x: 574.923828125, y: 60, w: 66.29861450195312, h: 65 },
    { x: 134, y: 389, w: 63, h: 52.47291946411133 },
    { x: 637, y: 383, w: 60, h: 65 },
    { x: 377, y: 400, w: 80, h: 30.05852508544922 },
  ];

  return (
    <>
      {nodesLocal.map((n, idx) => {
        const lx = MAP_LOCAL_X_OFF + n.x;
        const ly = MAP_LOCAL_Y_OFF + n.y;
        return (
          <div
            key={idx}
            className="absolute z-6 rounded-lg bg-[#fefefe] shadow-sm ring-1 ring-[#eaf3f7]"
            style={{
              left: pctW(lx),
              top: pctH(ly),
              width: pctW(n.w),
              height: pctH(n.h),
              maxWidth: n.w / CARD_W >= 1 ? "95%" : undefined,
            }}
          />
        );
      })}
    </>
  );
}

interface HealthcareRegulatorsSectionProps {
  data: HealthcareRegulatorsSectionData;
}

/**
 * Healthcare regulatory framework — Figma `2928:8031` (spacing from `8034`/`8035`/`8039`).
 */
export default function HealthcareRegulatorsSection({
  data,
}: HealthcareRegulatorsSectionProps) {
  const { headline, intro, regulatorRows, illustrationCard } = data;

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />
      <section
        className="relative w-full overflow-hidden py-16 xl:py-24 bg-white"
        aria-labelledby="healthcare-regulators-headline"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1506px] px-6 md:px-10 xl:px-[97px]">
          <div className="mx-auto flex max-w-[1312px] flex-col gap-16 xl:flex-row xl:items-start xl:justify-between xl:gap-6">
            <div className="max-w-[624px] xl:w-[624px] xl:shrink-0">
              <div className="flex flex-col gap-4 xl:gap-4">
                <h2
                  id="healthcare-regulators-headline"
                  className="max-w-[624px] font-jakarta text-[clamp(26px,_4vw,40px)] font-bold leading-none tracking-normal text-[#003859] xl:min-h-[96px] xl:text-[40px] xl:leading-[1.08]"
                >
                  {headline.split("\n").map((line, i) => (
                    <span key={i}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="max-w-[608px] pr-4 font-jakarta text-[clamp(17px,1vw,18px)] font-normal leading-[1.5] tracking-normal text-[#526879] xl:pr-[16px] xl:text-[18px] xl:leading-[1.445] xl:tracking-[0em]">
                  {intro}
                </p>
              </div>

              {/* `8034` itemSpacing & row math: gaps are 24px between bands */}
              <div className="mt-6 flex flex-col xl:gap-6">
                {regulatorRows.map((row, ri) => (
                  <div
                    key={`row-${ri}-${row.map((c) => c.title).join("-")}`}
                    className={
                      row.length === 1
                        ? "flex flex-col"
                        : "flex flex-col gap-[34px] sm:flex-row sm:gap-[34px] xl:gap-x-16 xl:gap-y-0"
                    }
                  >
                    {row.map((card, ci) => (
                      <HealthcareRegulatorCard
                        key={`${card.title}-${ci}`}
                        card={card}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Box */}
            <div className="relative order-1 mx-auto w-full max-w-[664px] shrink-0 xl:order-none">
              <div
                className="relative lg:aspect-664/666 overflow-hidden rounded-[30px]   shadow-[0px_26px_44px_-18px_rgba(0,56,89,0.06)]"
                style={{
                  background:
                    "linear-gradient(180deg, #fff 80%, transparent 100%)",
                }}
              >
                <div className="relative z-10 flex flex-col gap-4  pt-[clamp(31px,_6.34vw,_42px)] xl:gap-0">
                  <div className="flex px-[clamp(28px,_6.34vw,_42px)] max-w-[580px] flex-col gap-[6px] text-[#006dad]">
                    <p className="font-jakarta text-[clamp(22px,2.6vw,28px)] font-bold leading-[34px] xl:text-[28px] xl:tracking-normal">
                      {illustrationCard.title}
                    </p>
                    <p className="max-w-[580px] font-jakarta text-[13px] font-normal leading-[20px] sm:text-[14px] xl:leading-[20px]">
                      {illustrationCard.subtitle}
                    </p>
                  </div>
                  <Image
                    src="/images/industries/section-healthcare-regulators/healthcare-regulators.svg"
                    alt="Healthcare Regulators"
                    width={90}
                    height={38}
                    className="h-auto -mt-4  lg:w-full mx-auto object-cover  w-full"
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
        videoSrc="/videos/wave.mp4"
      />
    </>
  );
}
