import type { HealthcareEngagementSectionData } from "@/types/industry-page";
import Image from "next/image";

interface HealthcareEngagementSectionProps {
  data: HealthcareEngagementSectionData;
}

/**
 * Healthcare “How we engage” band — Figma `2943:9146`.
 * Three fixed-width cards, row `items-end`, distinct shadows/heights per node.
 */
export default function HealthcareEngagementSection({
  data,
}: HealthcareEngagementSectionProps) {
  const { headline, intro, cards } = data;

  return (
    <section
      className="relative w-full overflow-hidden bg-white pb-16 xl:pb-[180px] z-10"
      aria-labelledby="healthcare-engagement-headline"
    >
      <div className="mx-auto w-full max-w-[1506px] px-6 md:px-10 xl:px-[97px]">
        <div className="mx-auto flex max-w-[1312px] flex-col">
          <header className="flex max-w-[1312px] flex-col gap-[8px]">
            <h2
              id="healthcare-engagement-headline"
              className="font-jakarta text-[clamp(28px,4vw,40px)] font-bold capitalize leading-[1.2] text-[#003859] xl:text-[40px]"
            >
              {headline}
            </h2>
            <p className="max-w-[1312px] font-jakarta text-[17px] font-normal leading-[1.5] text-[#52697a] xl:text-[18px] xl:leading-[1.5]">
              {intro}
            </p>
          </header>

          {/* `2943:9190`: items-end + space-between across three × 400px cards */}
          <div className="mt-12 flex flex-col items-stretch gap-8 xl:mt-14 xl:flex-row xl:items-end xl:justify-between xl:gap-0">
            {cards.map((card, index) => {
              const heightClass =
                index === 1 ? "xl:min-h-[519px]" : "xl:min-h-[420px]";

              const shadowClass =
                index === 1
                  ? "shadow-[0px_18px_32px_-16px_rgba(0,56,89,0.05)]"
                  : "shadow-[0px_18px_16px_rgba(0,56,89,0.05)]";

              return (
                <article
                  key={`${card.title}-${index}`}
                  className={`flex w-full max-w-[400px] overflow-hidden shrink-0 flex-col rounded-[24px] border border-[rgba(194,205,214,0.5)] bg-white mx-auto xl:mx-0 xl:w-[400px] ${heightClass} ${shadowClass}`}
                >
                  <div className="mb-5 p-6  flex flex-1 flex-col justify-between gap-3">
                    <h3 className="font-jakarta text-[21px] font-bold leading-snug tracking-tight text-[#003859] sm:text-[22px] xl:leading-[1.25]">
                      {card.title}
                    </h3>
                    <p className="font-jakarta text-[15px] font-normal leading-[1.5] text-[#52697a] sm:text-[16px] xl:text-[16px]">
                      {card.body}
                    </p>
                  </div>{" "}
                  <EngagementVisual card={card} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EngagementVisual({
  card,
}: {
  card: HealthcareEngagementSectionData["cards"][number];
}) {
  const tallVisual = card.variant === "imageFade";
  const visualWrap = tallVisual
    ? "h-[240px] sm:h-[268px] xl:h-[287px]"
    : "h-[200px] sm:h-[216px] xl:h-[224px]";

  const src =
    typeof card.imageSrc === "string" && card.imageSrc.length > 0
      ? card.imageSrc
      : "/images/industries/section-healthcare-engagement/HIPAA-GDPR.svg";

  const imageFade = card.variant === "imageFade";

  return (
    <div className={`relative w-full shrink-0 overflow-hidden  ${visualWrap}`}>
      <Image
        src={src}
        alt={card.imageAlt ?? card.title}
        fill
        className={`object-cover ${imageFade ? "object-[50%_40%]" : "object-[50%_50%]"}`}
        sizes="(max-width: 1280px) 92vw, 400px"
        priority={false}
      />

      {imageFade ? (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[50px]"
            style={{
              background:
                "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[50px]"
            style={{
              background:
                "linear-gradient(270deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[-20%] left-0 right-0 z-[2] h-[45%] bg-[#FFFFFF]"
            style={{
              filter: "blur(22px)",
              opacity: 0.85,
            }}
            aria-hidden
          />
        </>
      ) : null}
    </div>
  );
}
