"use client";

import Link from "next/link";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import type { PartnerProgramData } from "@/data/partner-program";

interface PartnerProgramCtaSectionProps {
  data: PartnerProgramData["cta"];
}

export default function PartnerProgramCtaSection({
  data,
}: PartnerProgramCtaSectionProps) {
  const { title, subtitle, primaryCta, secondaryCta } = data;

  return (
    <section className="border-t border-[#003859]/5 bg-[#003859] px-6 py-24 lg:py-28">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-5 font-jakarta text-[clamp(32px,4vw,48px)] font-extrabold leading-tight text-white">
          {title}
        </h2>
        <p className="mb-9 font-jakarta text-lg leading-[1.55] text-white">
          {subtitle}
        </p>
        <div className="flex flex-col items-center gap-4">
          <HoverSwapButton
            href={primaryCta.href}
            label={primaryCta.label}
            hoverLabel={primaryCta.hoverLabel}
            variant="secondary"
            showChevrons={false}
            className="min-w-[200px] px-8 py-4 text-lg font-ano"
          />
          <Link
            href={secondaryCta.href}
            className="font-jakarta text-base font-bold text-white underline underline-offset-4 transition-colors hover:text-[#abe0ff]"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
