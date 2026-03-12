import Image from "next/image";
import Link from "next/link";
import type { PartnersCtaData } from "@/data/partners-cta";

interface PartnersCallToActionSectionProps {
  data: PartnersCtaData;
}

export default function PartnersCallToActionSection({
  data,
}: PartnersCallToActionSectionProps) {
  const { heading1, heading2, subtitle, primaryCta, secondaryCta } = data;

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-[60px]"
      style={{
        background:
          "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 163, 224, 0.08) 0%, transparent 70%), rgb(0, 56, 89)",
      }}
    >
      <div className="flex w-full  flex-col items-center gap-[50px] px-6">
        {/* Logo + Text block - gap 16px */}
        <div className="flex flex-col items-center gap-4">
          {/* Logo  */}
          <div
            className="relative h-[83px] w-[111px]"
            style={{ filter: "brightness(0) invert(1)" }}
          >
            <Image
              src="/images/logo-icon.svg"
              alt="WHITEGUARD"
              fill
              className="object-contain"
              sizes="111px"
            />
          </div>

          {/* Text block - gap 18px */}
          <div className="flex flex-col max-w-[600px] items-center gap-[18px] text-center">
            <h2 className="font-jakarta text-[clamp(36px,4.5vw,52px)] font-extrabold leading-[57.2px] tracking-[-1.56px] text-white">
              {heading1}
              <br />
              {heading2}
            </h2>
            <p className="font-jakarta text-[17px] font-normal leading-[29.75px] text-white">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Buttons - gap 16px */}
        <div className="grid w-full max-w-md grid-cols-1 items-center justify-center gap-4 sm:max-w-none sm:grid-cols-2">
          <Link
            href={primaryCta.href}
            className="flex h-[57px]  flex-1 items-center justify-center gap-3 rounded-full bg-white px-10 py-[15px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] transition-opacity hover:opacity-95"
          >
            <span className="font-jakarta text-[16px] font-extrabold leading-[24px] text-[#003859]">
              {primaryCta.label}
            </span>
            <Image
              src={primaryCta.icon}
              alt=""
              width={16}
              height={16}
              className="shrink-0"
            />
          </Link>
          <Link
            href={secondaryCta.href}
            className="flex h-[57px] w-full flex-1 items-center justify-center rounded-full border border-white/30 px-[33px] py-[17px] transition-opacity hover:bg-white/10 sm:min-w-[200px] lg:min-w-[280px] lg:max-w-[310px]"
          >
            <span className="font-jakarta text-[15px] font-semibold leading-[22.5px] text-white/85">
              {secondaryCta.label}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
