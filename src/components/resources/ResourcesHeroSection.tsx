import Image from "next/image";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface ResourcesHeroSectionProps {
  headline: { line1: string; line2: string };
  subtitle: string;
}

export default function ResourcesHeroSection({
  headline,
  subtitle,
}: ResourcesHeroSectionProps) {
  return (
    <>
      {" "}
      <section className="relative w-full overflow-hidden">
        {/* Hero background - 492px height, gradient */}
        <div
          className="relative flex min-h-[400px] w-full items-center justify-center py-16 lg:h-[492px] lg:py-0"
          style={{
            background:
              "linear-gradient(0deg, #ABE0FF 0%, rgba(171, 224, 255, 0.00) 100%)",
          }}
        >
          {/* Content - centered */}
          <div className="container relative z-10 flex flex-col items-center gap-4 text-center">
            <h1 className="font-jakarta flex flex-col  gap-5 text-[clamp(32px,5vw,72px)] font-medium leading-[1.2] tracking-[-0.02em] lg:text-[72px]">
              <span className="text-[#003859] ">{headline.line1}</span>

              <span className="font-bold text-[#0087D7]">{headline.line2}</span>
            </h1>
            <p className="max-w-[752px] font-jakarta text-[16px] font-normal leading-[30.6px] text-[#52697A] lg:text-[20px]">
              {subtitle}
            </p>
            {/* Decorative icons  */}
            <div
              className="pointer-events-none absolute -left-[3%] xl:-left-[5%]  top-[50%] -translate-y-1/2 hidden h-[73px] w-[77px] lg:block"
              aria-hidden
            >
              <Image
                src="/images/resources/icon-1.png"
                alt=""
                width={77}
                height={73}
                className="h-full w-full object-contain opacity-80"
              />
            </div>
            <div
              className="pointer-events-none absolute xl:-right-[6%] -right-[3%] top-[50%] -translate-y-1/2 hidden h-[81px] w-[80px] lg:block"
              aria-hidden
            >
              <Image
                src="/images/resources/icon-2.png"
                alt=""
                width={80}
                height={81}
                className="h-full w-full object-contain opacity-80"
              />
            </div>
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
