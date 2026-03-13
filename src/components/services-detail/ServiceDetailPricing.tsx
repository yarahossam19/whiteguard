import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";
import Image from "next/image";

interface Plan {
  id: string;
  title: string;
  iconSrc: string;
  description: string;
}

interface ServiceDetailPricingProps {
  heading: string;
  subtitle: string;
  plans: Plan[];
  ctaLabel: string;
  ctaHref: string;
}

export default function ServiceDetailPricing({
  heading,
  subtitle,
  plans,
  ctaLabel,
  ctaHref,
}: ServiceDetailPricingProps) {
  return (
    <>
      <SectionVideoSeparator
        direction="top"
        videoSrc="/videos/wave.mp4"
        className="pt-100 z-[-1]"
      />
      <section
        className="flex w-full flex-col items-center gap-12 px-4 py-16 lg:gap-16 lg:py-20"
        style={{
          background:
            "linear-gradient(180deg, rgb(171, 225, 255) 0%, rgb(231, 246, 255) 20%, rgb(231, 246, 255) 80%, rgb(171, 224, 255) 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
            {heading}
          </h2>
          <p className="font-jakarta text-[16px] font-normal leading-[24px] text-[#52697a]">
            {subtitle}
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-[1312px] gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col gap-4 rounded-[16px] border border-[rgba(0,56,89,0.05)] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] lg:p-8"
            >
              <Image
                src={plan.iconSrc}
                alt={plan.title}
                width={24}
                height={24}
                className=" object-contain"
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-jakarta text-[18px] font-normal leading-[1.2] text-[#003859]">
                  {plan.title}
                </h3>
                <p className="font-jakarta text-[16px] font-normal leading-[1.5] text-[#52697a]">
                  {plan.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <HoverSwapButton
          href={ctaHref}
          label={ctaLabel}
          hoverLabel={ctaLabel}
          showChevrons={false}
          variant="cta"
        />
      </section>
      <SectionVideoSeparator
        direction="bottom"
        videoSrc="/videos/wave.mp4"
        transform="rotateX(180deg)"
      />
    </>
  );
}
