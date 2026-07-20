import Image from "next/image";
import Link from "next/link";
import type { ServiceCard as ServiceCardType } from "@/data/services-page";
import { getServiceDetailPath } from "@/data/services-page";
import { HoverSwapButton } from "../ui/HoverSwapButton";

interface ServiceCardProps {
  card: ServiceCardType;
}

export default function ServiceCard({ card }: ServiceCardProps) {
  const { title, description, features, cta, image, imageLeft } = card;
  const detailHref =
    getServiceDetailPath(card.link) ?? `/services/${card.link}`;

  const contentBlock = (
    <div
      className={`flex flex-col gap-6 px-4 sm:px-6 lg:px-8 ${imageLeft ? "lg:pe-12 lg:ps-8" : "lg:pe-16"}`}
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-jakarta text-[24px] font-semibold leading-[36px] text-[#003859] lg:text-[24px]">
          {title}
        </h2>
        <p className="font-jakarta text-[14px] font-normal leading-[29.25px] text-[#52697A] lg:text-[16px] first-line:font-bold">
          {description}
        </p>
      </div>

      {/* Key Features  */}
      <div className="flex flex-col gap-4">
        <p className="font-jakarta text-[14px] font-semibold uppercase leading-[20px] tracking-[0.7px] text-[#003859]">
          Key Features
        </p>
        <div className="flex flex-wrap gap-6 lg:gap-[20px]">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div
                className="flex h-[50px] w-[56px] shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "url('/images/icons/bg-icons.svg')",
                }}
              >
                <Image
                  src={f.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <p className="font-jakarta text-[10px] font-medium leading-[15px] text-[#52697A] max-w-[105px]">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {/* CTA link - uses card link for details page */}
        <HoverSwapButton
          href={`/contact`}
          label={cta.label}
          hoverLabel={cta.label}
          variant="secondary"
          showChevrons={false}
          showImg={true}
          imgSrc="/images/icons/arrow-right-1.svg"
          className="px-2 md:px-3 lg:px-6 py-2 text-[clamp(14px,1.1vw,18px)]  font-ano w-full flex-row-reverse"
        />
        <Link
          href={detailHref}
          className="inline-flex items-center justify-center gap-4 font-ano text-[14px] font-normal tracking-[0.48px] text-[#006DAD] transition-colors hover:text-[#0087D7] lg:text-[18px] bg-[#E7F6FF] rounded-[8px] px-6 py-2"
        >
          <span>Know More</span>
          {/* <Image
          src="/images/icons/arrow-right-2.svg"
          alt=""
          width={24}
          height={24}
          className="shrink-0 rotate-180"
        /> */}
        </Link>
      </div>
    </div>
  );

  const imageBlock = (
    <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] lg:h-[400px] lg:w-[45%]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 646px"
      />
    </div>
  );

  return (
    <div
      className={`flex ${imageLeft ? "flex-col" : "flex-col-reverse"} items-center gap-8 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-[32px]`}
    >
      {imageLeft ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
