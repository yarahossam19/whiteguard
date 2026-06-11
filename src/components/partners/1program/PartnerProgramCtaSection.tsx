"use client";

import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { PartnerProgramData } from "@/data/partner-program";

interface PartnerProgramCtaSectionProps {
  data: PartnerProgramData["cta"];
}

export default function PartnerProgramCtaSection({
  data,
}: PartnerProgramCtaSectionProps) {
  const { heading, subtext, button } = data;

  return (
    <section className="border-t border-[#003859]/5 bg-[#003859] px-6 py-24 lg:py-28">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-5 font-jakarta text-[clamp(32px,4vw,48px)] font-extrabold leading-tight text-white">
          {heading.line1}
          {heading.line2 ? (
            <>
              <br />
              <span className="text-[#ABE0FF]">{heading.line2}</span>
            </>
          ) : null}
        </h2>
        <p className="mb-9 font-jakarta text-lg leading-[1.55] text-white/90">
          {subtext}
        </p>
        <HoverSwapButton
          href={button.href}
          label={button.label}
          hoverLabel={button.hoverLabel}
          variant={button.variant as "cta" | "secondary"}
          showChevrons={false}
          className="min-w-[200px] px-8 py-4 text-lg font-ano"
        />
      </div>
    </section>
  );
}
