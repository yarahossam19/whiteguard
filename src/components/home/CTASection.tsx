import type { CtaSectionData } from "@/data/cta-section";
import { HoverSwapButton } from "../ui/HoverSwapButton";

interface CTASectionProps {
  data: CtaSectionData;
}

export default function CTASection({ data }: CTASectionProps) {
  const { heading, subtext, button } = data;

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 lg:px-[7vw]"
      style={{
        background: "rgba(231, 246, 255, 0.8)",
        backdropFilter: "blur(15px)",
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 406,
          height: 1060,
          borderRadius: 4000,
          background: "var(--Primary-400, #02A1FF)",
          mixBlendMode: "plus-darker",
          filter: "blur(350px)",
          top: "200%",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-[896px] flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
            <span className="text-[#003859]">{heading.line1}</span>
            <br />
            <span className="text-[#0087D7]">{heading.line2}</span>
          </h2>
          <p className="font-jakarta lg:max-w-[500px] text-base leading-[1.7] text-[#52697A]">
            {subtext}
          </p>
        </div>
        <HoverSwapButton
          href={button.href}
          label={button.label}
          hoverLabel={button.hoverLabel}
          variant={button.variant as "cta" | "secondary"}
          showChevrons={false}
        />
      </div>
    </section>
  );
}
