import Image from "next/image";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface ContactHeroProps {
  headline: { line1: string; line2: string };
  subtitle: string;
}

export default function ContactHero({ headline, subtitle }: ContactHeroProps) {
  return (
    <>
      {" "}
      <section className="relative w-full overflow-hidden">
        {/* Hero background - 492px height, gradient */}
        <div
          className="relative flex min-h-[180px] w-full items-center justify-center py-16 lg:h-[400px] lg:py-0"
          style={{
            background:
              "linear-gradient(0deg, #ABE0FF 0%, rgba(171, 224, 255, 0.00) 100%)",
          }}
        >
          {/* Content - centered */}
          <div className="relative z-10 flex   flex-col items-center gap-4 px-6 text-center">
            <h1 className="font-jakarta flex flex-col  gap-5 text-[clamp(32px,5vw,72px)] font-medium leading-[1.2] tracking-[-0.02em] lg:text-[72px]">
              <span className="text-[#003859] ">{headline.line1}</span>
            </h1>
            <p className="max-w-[752px] font-jakarta text-[16px]  font-normal leading-[30.6px] text-[#52697A] lg:text-[20px]">
              {subtitle}
            </p>
            {/* Decorative icons  */}
            <div
              className="pointer-events-none absolute left-[10%]  top-[25%] -translate-y-1/2 hidden h-[50px] w-[50px] lg:block"
              aria-hidden
            >
              <Image
                src="/images/icons/phone-call.svg"
                alt=""
                width={50}
                height={50}
                className="h-full w-full object-contain  "
              />
            </div>
            <div
              className="pointer-events-none absolute right-[10%] top-[25%] -translate-y-1/2 hidden h-[50px] w-[50px] lg:block"
              aria-hidden
            >
              <Image
                src="/images/icons/envelope.svg"
                alt=""
                width={50}
                height={50}
                className="h-full w-full object-contain  "
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
