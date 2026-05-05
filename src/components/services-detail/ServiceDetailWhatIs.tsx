"use client";
import ClientLogos from "@/components/shared/ClientLogos";
import { getClientLogosData } from "@/data/client-logos";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";
import { useMediaQuery } from "react-responsive";

interface ServiceDetailWhatIsProps {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function ServiceDetailWhatIs({
  heading,
  body,
  ctaLabel,
  ctaHref,
}: ServiceDetailWhatIsProps) {
  const logos = getClientLogosData();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <>
      <SectionVideoSeparator
        className={isMobile ? `mt-[-50px]!` : `mt-[-290px]`}
        direction="top"
        videoSrc="/videos/wave.mp4"
      />
      <section
        className="flex min-h-[786px] w-full flex-col items-center justify-between py-16 lg:py-[147px]"
        style={{
          background:
            "linear-gradient(180deg, rgb(171, 225, 255) 0%, rgb(231, 246, 255) 20%, rgb(231, 246, 255) 80%, rgb(171, 224, 255) 100%)",
        }}
      >
        <div className="container flex flex-col items-center">
          <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-[50px] text-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
                {heading}
              </h2>
              <p className="font-jakarta text-[18px] font-normal leading-[1.5] text-[#52697a] lg:text-[24px]">
                {body}
              </p>
            </div>
            <HoverSwapButton
              href={ctaHref}
              label={ctaLabel}
              hoverLabel={""}
              showChevrons={false}
              variant="secondary"
              className="w-full md:w-auto  text-sm md:text-base lg:text-lg  font-ano"
            />
          </div>
          <div className="mt-12 flex w-full justify-center pb-12 lg:mt-[87px] lg:pb-[91px]">
            <ClientLogos logos={logos} className="!bg-transparent pt-0 pb-0" />
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        videoSrc="/videos/wave.mp4"
        transform="rotateX(180deg)"
      />
    </>
  );
}
