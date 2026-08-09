import Image from "next/image";
import Link from "next/link";
import { HoverSwapButton } from "../ui/HoverSwapButton";

export interface BottomCtaHighlight {
  iconSrc: string;
  /** Accessibility label when icon is decorative; defaults to "". */
  iconAlt?: string;
  /** Lines of bold copy under the icon (#ABE0FF). Multiple lines separate with `<br aria-hidden />` like Figma. */
  lines: string[];
}

interface ServicesPageBottomCTAProps {
  heading: string;
  headingAccent: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
  className?: string;
  /** Figma `2044:4209` — five-column trust pillars (shown on defensive tab today). */
  highlights?: BottomCtaHighlight[];
}

export default function ServicesPageBottomCTA({
  heading,
  headingAccent,
  subtitle,
  buttonLabel,
  href,
  className,
  highlights,
}: ServicesPageBottomCTAProps) {
  return (
    <section
      className="flex flex-col items-center justify-center gap-12 py-16 lg:gap-[50px] lg:py-20"
      style={{ backgroundColor: "#003859" }}
    >
      <div className="container flex flex-col items-center gap-10">
        <div className="flex max-w-[1124px] flex-col items-center gap-4 text-center">
          <h2 className="font-jakarta text-[clamp(36px,5vw,60px)] font-bold leading-[1.25] tracking-[-1.5px]">
            <span className="text-white">{heading}</span>
            <br />
            <span className="text-[#BEDBFF]">{headingAccent}</span>
          </h2>
          <p className="max-w-[711px] font-jakarta text-[18px] font-normal leading-[32.5px] text-[#DBEAFE] lg:text-[20px]">
            {subtitle}
          </p>
        </div>

        {highlights && highlights.length > 0 ? (
          <div className="flex w-full max-w-[1124px] flex-wrap items-start justify-center gap-x-2 gap-y-8 lg:justify-between lg:flex-nowrap">
            {highlights.map((item, hi) => (
              <div
                key={`${item.iconSrc}-${hi}`}
                className="flex min-w-[min(100%,164px)] max-w-none flex-[1_0_164px] flex-col gap-2 rounded-2xl px-2 py-6 lg:min-w-0 lg:flex-[1_0_0] lg:basis-0 lg:gap-2 lg:py-6 lg:pb-8"
              >
                <div className="relative size-10 shrink-0">
                  <Image
                    src={item.iconSrc}
                    alt={item.iconAlt ?? ""}
                    fill
                    className="object-contain object-left"
                    sizes="40px"
                  />
                </div>
                <p className="min-w-full max-w-none text-left font-jakarta text-base font-bold leading-7 tracking-normal text-[#ABE0FF]">
                  {item.lines.map((line, li) => (
                    <span key={`${hi}-${li}`}>
                      {li > 0 ? <br aria-hidden /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <HoverSwapButton
          href={href}
          label={buttonLabel}
          hoverLabel={buttonLabel}
          variant={"secondary"}
          showChevrons={false}
          className={`px-6 md:px-3 lg:px-6 py-[14px] text-[clamp(14px,1.1vw,24px)]  font-ano ${className ? className : ""}`}
        />
      </div>
    </section>
  );
}
