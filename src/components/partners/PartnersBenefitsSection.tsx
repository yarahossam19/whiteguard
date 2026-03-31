import Image from "next/image";
import type { PartnersBenefitsData } from "@/data/partners-benefits";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface PartnersBenefitsSectionProps {
  data: PartnersBenefitsData;
}

export default function PartnersBenefitsSection({
  data,
}: PartnersBenefitsSectionProps) {
  const { badge, heading, subtitle, cards } = data;

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />

      <section
        className="relative w-full overflow-hidden py-20 lg:py-24"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="container">
          {/* Header */}
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <div
              className="rounded-full px-4 py-1.5"
              style={{
                backgroundColor: "#E8F4FD",
                height: 30,
              }}
            >
              <p className="font-jakarta text-[12px] font-bold leading-[18px] tracking-[0.84px] text-[#00A3E0]">
                {badge}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-jakarta text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#003859]">
                {heading.line1}
                <span className="text-[#0087D7]">{heading.line2}</span>
              </h2>
              <p className="mx-auto max-w-[644px] font-jakarta text-[15px] font-normal leading-[26.25px] text-[#52697A]">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div
            className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-[26px] md:gap-y-[19px]"
            style={{ maxWidth: 1308 }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-col gap-4 rounded-[16px] bg-white p-[33px]"
                style={{
                  boxShadow: "0px 10px 40px 0px rgba(0, 56, 89, 0.06)",
                }}
              >
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src={card.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-jakarta text-[19px] font-bold leading-[23.75px] text-[#003859]">
                    {card.title}
                  </h3>
                  <p className="font-jakarta text-[14px] font-normal leading-[24.5px] text-[#52697A]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
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
