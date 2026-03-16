import Image from "next/image";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";

interface StandardsCard {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
}

interface ServiceDetailStandardsProps {
  heading: string;
  cards: StandardsCard[];
  certifications: {
    heading: string;
    items: {
      id: string;
      title: string;
      iconSrc: string;
    }[];
  };
}

const CERT_ICONS = ["award", "wrench", "eye"];

export default function ServiceDetailStandards({
  heading,
  cards,
  certifications,
}: ServiceDetailStandardsProps) {
  return (
    <section className="bg-white px-4 pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1152px]">
        <h2 className="mb-12 text-center font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
          {heading}
        </h2>
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-4 rounded-[16px] bg-[rgba(224,230,235,0.25)] px-8 pt-8 pb-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-6 items-center justify-center rounded bg-[#003859]/10">
                  <Image
                    src={card.iconSrc}
                    alt={card.title}
                    width={16}
                    height={16}
                  />
                </div>
                <h3 className="font-jakarta text-[17px] font-normal leading-[25.5px] text-[#003859]">
                  {card.title}
                </h3>
              </div>
              <p className="font-jakarta text-[15px] font-normal leading-[27px] text-[#52697a]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-[16px] border border-[#c2cdd6] bg-white p-8">
          <h3 className="mb-6 text-center font-jakarta text-[17px] font-normal leading-[25.5px] text-[#003859]">
            {certifications.heading}
          </h3>
          <div
            className={`grid gap-6 sm:grid-cols-${certifications.items.length}`}
          >
            {certifications.items.map((item, i) => (
              <div key={item.id} className="flex gap-4">
                <div
                  className="flex size-5 shrink-0 items-center justify-center"
                  key={item.id}
                >
                  <Image src={item.iconSrc} alt="" width={20} height={20} />
                </div>
                <p className="font-jakarta text-[14px] font-normal leading-[23.8px] text-[#52697a]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
