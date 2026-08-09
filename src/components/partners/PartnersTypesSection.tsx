import Image from "next/image";
import type { PartnersTypesData } from "@/data/partners-types";

interface PartnersTypesSectionProps {
  data: PartnersTypesData;
}

export default function PartnersTypesSection({
  data,
}: PartnersTypesSectionProps) {
  const { heading, subtitle, cards } = data;

  return (
    <section className="relative w-full overflow-hidden bg-white pb-16 lg:pb-40">
      <div className="container">
        {/* Header  */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-jakarta text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-1.05px] text-[#003859]">
            {heading.line1}
            <span className="text-[#0087D7]">{heading.line2}</span>
          </h2>
          <p className="max-w-[471px] font-jakarta text-[15px] font-normal leading-[26.25px] text-[#52697A]">
            {subtitle}
          </p>
        </div>

        {/* Cards grid  */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="overflow-hidden rounded-[16px] border border-[rgba(0,56,89,0.06)] bg-white"
              style={{
                boxShadow: "0px 10px 40px 0px rgba(0, 56, 89, 0.07)",
              }}
            >
              {/* Top bar  */}
              <div
                className="h-[6px] w-full shrink-0"
                style={{ backgroundColor: "#003859" }}
              />
              <div className="flex flex-col gap-[15px] p-7">
                {/* Icon  */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(0, 56, 89) 0%, rgb(0, 82, 127) 100%)",
                    boxShadow: "0px 6px 20px 0px rgba(0, 56, 89, 0.2)",
                  }}
                >
                  <Image
                    src={card.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                {/* Tag  */}
                <p className="font-jakarta text-[11px] font-bold leading-[16.5px] tracking-[0.77px] text-[#00A3E0]">
                  {card.tag}
                </p>
                {/* Title  */}
                <h3 className="font-jakarta text-[20px] font-extrabold leading-[24px] text-[#003859]">
                  {card.title}
                </h3>
                {/* Description  */}
                <p className="font-jakarta text-[14px] font-normal leading-[25.2px] text-[#52697A]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
