import Link from "next/link";
import Image from "next/image";
import { HoverSwapButton } from "../ui/HoverSwapButton";
import { SectionImageSeparator } from "../ui/SectionImageSeparator";

interface ServiceDetailCTAProps {
  heading: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function ServiceDetailCTA({
  heading,
  subtitle,
  buttonLabel,
  buttonHref,
}: ServiceDetailCTAProps) {
  return (
    <>
      <SectionImageSeparator
        direction="top"
        imageSrc="/images/wave.svg"
        // transform="scaleY(-1)"
      />
      <section className="relative flex flex-col items-center justify-center gap-12 overflow-hidden bg-[#003859] py-20 lg:py-24">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute left-1/2 top-1/2   h-0 w-full max-w-[50%] -translate-1/2">
          <div className="absolute -left-5 -top-27 size-16 rounded-full bg-[rgba(224,230,235,0.25)]" />
          <div className="absolute -right-5 -top-25 size-10 rounded-full bg-[rgba(224,230,235,0.25)]" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2   h-0 w-full max-w-[25%] -translate-1/2">
          <div className="absolute -left-5 -top-30 text-3xl rounded-full text-[rgba(224,230,235,0.25)]">
            +
          </div>
          <div className="absolute -right-5 -top-25 text-lg rounded-full text-[rgba(224,230,235,0.25)]">
            +
          </div>
        </div>
        <div className="container relative z-10 flex flex-col items-center gap-6 text-center">
          <h2 className="font-jakarta text-[24px] font-normal leading-[39px] text-white lg:text-[30px]">
            {heading}
          </h2>
          <p className="max-w-[600px] font-jakarta text-[16px] font-normal leading-[27.2px] text-white/70">
            {subtitle}
          </p>

          <HoverSwapButton
            href={buttonHref}
            label={buttonLabel}
            hoverLabel={buttonLabel}
            variant="secondary"
            showChevrons={false}
            showImg={true}
            imgSrc="/images/icons/tel.svg"
            className="w-full md:w-auto text-sm md:text-base lg:text-lg  font-ano"
          />
        </div>
      </section>
    </>
  );
}
