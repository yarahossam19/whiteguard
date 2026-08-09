"use client";

import Image from "next/image";
import type { AboutTeamData } from "@/data/about-team";

interface TeamSectionProps {
  data: AboutTeamData;
}

export default function TeamSection({ data }: TeamSectionProps) {
  const { heading, description } = data;
  return (
    <section className="relative w-full bg-white pb-16 lg:mb-10 lg:pt-0">
      <div className="container flex flex-col items-center gap-12 lg:gap-16">
        {/* Heading */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
            <span className="text-[#003859]">{heading.line1}</span>
            <br className="hidden lg:block" />
            <span className="text-[#0087D7]">{heading.line2}</span>
          </h2>
          <p className="max-w-[600px] font-jakarta text-base leading-[1.8] text-[#52697A]">
            {description}
          </p>
        </div>

        <Image
          src="/images/team.png"
          alt="WhiteGuard team members"
          width={1296}
          height={305}
          className="h-auto w-full max-w-full object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1296px"
        />
      </div>
    </section>
  );
}
