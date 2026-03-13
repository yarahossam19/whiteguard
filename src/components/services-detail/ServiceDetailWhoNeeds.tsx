import Image from "next/image";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";

interface Card {
  title: string;
  subtitle: string;
  iconBg: string;
  cardBg: string;
}

interface ServiceDetailWhoNeedsProps {
  heading: string;
  subtitle: string;
  cards: Card[];
  examples: string;
}

const CARD_ICONS = [
  "/images/icons/pt-icon.svg",
  "/images/icons/mc-icon.svg",
  "/images/icons/rb-icon.svg",
  "/images/icons/ds-icon.svg",
];

export default function ServiceDetailWhoNeeds({
  heading,
  subtitle,
  cards,
  examples,
}: ServiceDetailWhoNeedsProps) {
  return (
    <section className="bg-white px-4 pb-16 lg:pb-[112px]">
      <div className="mx-auto max-w-[1104px]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
            {heading}
          </h2>
          <p className="font-jakarta text-[16px] font-normal leading-[27.2px] text-[#52697a]">
            {subtitle}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="flex flex-col rounded-[16px] p-6"
              style={{ backgroundColor: card.cardBg }}
            >
              <div
                className="mb-4 flex size-12 items-center justify-center rounded-[14px]"
                style={{ backgroundColor: card.iconBg }}
              >
                <Image
                  src={CARD_ICONS[i % CARD_ICONS.length]}
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-jakarta text-[17px] font-normal leading-[25.5px] text-[#003859]">
                {card.title}
              </h3>
              <p className="mt-2 font-jakarta text-[14px] font-normal leading-[21px] text-[#52697a]">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[16px] bg-[rgba(224,230,235,0.25)] px-8 py-8">
          <p className="text-center font-jakarta text-[15px] font-normal leading-[27px] text-[#52697a]">
            <span className="font-medium text-[#003859]">Short Examples: </span>
            {examples}
          </p>
        </div>
      </div>
    </section>
  );
}
