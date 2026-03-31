import Link from "next/link";
import { HoverSwapButton } from "../ui/HoverSwapButton";

interface ServicesPageBottomCTAProps {
  heading: string;
  headingAccent: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
}

export default function ServicesPageBottomCTA({
  heading,
  headingAccent,
  subtitle,
  buttonLabel,
  href,
}: ServicesPageBottomCTAProps) {
  return (
    <section
      className="flex flex-col items-center justify-center gap-12 py-16 lg:gap-[50px] lg:py-20"
      style={{ backgroundColor: "#003859" }}
    >
      <div className="container flex flex-col items-center gap-5">
        <div className="flex max-w-[1024px] flex-col items-center gap-4 text-center">
          <h2 className="font-jakarta text-[clamp(36px,5vw,60px)] font-bold leading-[1.25] tracking-[-1.5px]">
            <span className="text-white">{heading}</span>
            <br />
            <span className="text-[#BEDBFF]">{headingAccent}</span>
          </h2>
          <p className="max-w-[711px] font-jakarta text-[18px] font-normal leading-[32.5px] text-[#DBEAFE] lg:text-[20px]">
            {subtitle}
          </p>
        </div>

        <HoverSwapButton
          href={href}
          label={buttonLabel}
          hoverLabel={buttonLabel}
          variant={"secondary"}
          showChevrons={false}
          className="px-6 py-[14px] text-[clamp(16px,1.4vw,24px)]  font-ano"
        />
      </div>
    </section>
  );
}
