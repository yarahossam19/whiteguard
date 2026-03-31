import Image from "next/image";
import type { WhyChooseUsSectionData } from "@/data/why-choose-us-section";

interface WhyChooseUsSectionProps {
  data: WhyChooseUsSectionData;
}

export default function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  const { heading, description, cards } = data;

  return (
    <section className="relative w-full bg-white py-16 lg:py-24">
      <div className="container flex flex-col gap-16 lg:flex-row lg:gap-16">
        {/* Left: Heading + Description - sticky while scrolling through cards */}
        <div className="flex w-full lg:max-w-[443px] flex-col gap-6 lg:sticky lg:top-28 lg:w-[443px] lg:shrink-0 lg:self-start">
          <div className="flex flex-col text-center lg:text-left gap-0">
            <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] text-[#003859]">
              {heading.line1}
            </h2>
            <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] text-[#003859]">
              {heading.line2}
            </h2>
            <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] text-[#0087D7]">
              {heading.line3}
            </h2>
          </div>
          <p className="font-jakarta text-base text-center lg:text-left leading-[1.8] text-[#52697A]">
            {description}
          </p>
        </div>

        {/* Right: Feature Cards */}
        <div className="flex flex-1 flex-col gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex min-h-[188px] flex-row items-start gap-6 rounded-[28px] border px-[33px] pt-[33px] pb-8"
              style={{
                borderColor: "#e0f2fe",
                borderWidth: "1px",
                background:
                  "linear-gradient(163.76deg, #FFFFFF 0%, rgba(240, 249, 255, 0.5) 100%)",
              }}
            >
              <div className="relative h-16 w-16 shrink-0">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="font-jakarta text-xl font-bold leading-[1.5] text-[#003859]">
                  {card.title}
                </h3>
                <p className="font-jakarta text-base leading-[1.75] text-[#52697A]">
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
