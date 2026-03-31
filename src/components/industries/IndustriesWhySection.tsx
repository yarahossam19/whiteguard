import Image from "next/image";
import type { IndustriesWhyData } from "@/data/industries-why";

interface IndustriesWhySectionProps {
  data: IndustriesWhyData;
}

export default function IndustriesWhySection({
  data,
}: IndustriesWhySectionProps) {
  const { heading, subtitle, cards } = data;

  return (
    <section className="relative  w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="container overflow-hidden flex flex-col items-center gap-16">
        {/* Heading + Subtitle */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-jakarta text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.04em] text-[#003859]">
            {heading.line1}
            <br />
            {heading.line2}
            <span className="text-[#0087D7]">{heading.line3}</span>
          </h2>
          <p className="mx-auto max-w-[568px] font-jakarta text-base font-normal leading-[1.7] text-[#52697A]">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-hidden">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex     flex-col gap-4 rounded-[20px] border border-[rgba(0,56,89,0.08)] bg-white px-4 pb-8 pt-4 shadow-[0px_4px_24px_0px_rgba(0,56,89,0.06)]"
            >
              <div className="flex  items-start justify-between">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] shadow-[0px_6px_18px_0px_rgba(0,56,89,0.22)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(0, 56, 89) 0%, rgb(26, 107, 158) 100%)",
                  }}
                >
                  <Image
                    src={card.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="object-contain "
                  />
                </div>
                <span className="rounded-full border border-[rgba(0,56,89,0.1)] bg-[rgba(0,56,89,0.07)] px-2.5 py-1 font-jakarta text-[10px] font-bold uppercase tracking-[0.8px] text-[#003859]">
                  {card.tag}
                </span>
              </div>
              <h3 className="font-jakarta text-lg font-bold leading-[1.3] tracking-[-0.36px] text-[#0f2233]">
                {card.title}
              </h3>
              <p className="font-jakarta text-sm font-normal leading-[1.75] text-[#6b7280]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
