"use client";

import Image from "next/image";
import { useState } from "react";
import type { AboutTeamData } from "@/data/about-team";

interface TeamSectionProps {
  data: AboutTeamData;
}

export default function TeamSection({ data }: TeamSectionProps) {
  const { heading, description, members } = data;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="relative w-full bg-white px-4 pb-16 sm:px-6 lg:mb-60 lg:px-[7vw] lg:pt-0">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 lg:gap-16">
        {/* Heading */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
            <span className="text-[#003859]">{heading.line1}</span>
            <span className="text-[#0087D7]">{heading.line2}</span>
          </h2>
          <p className="max-w-[600px] font-jakarta text-base leading-[1.8] text-[#52697A]">
            {description}
          </p>
        </div>

        {/* Team Cards */}
        <div
          className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {members.map((member, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={member.id}
                className="group relative aspect-3/4 w-full overflow-hidden rounded-[28px] border transition-all duration-300"
                style={{
                  borderColor: "#e0f2fe",
                  boxShadow: isActive
                    ? "0 12px 32px rgba(0, 56, 89, 0.12)"
                    : "0 4px 12px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay + content */}
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-end gap-4 p-6 pt-32 transition-all duration-300"
                  style={{
                    background:
                      " linear-gradient(0deg, rgba(0, 56, 89, 0.85) 0%, rgba(0, 56, 89, 0.30) 45%, rgba(0, 0, 0, 0.00) 72%)",
                  }}
                >
                  <div className="flex flex-col gap-0.5">
                    <h3
                      className="font-jakarta text-xl font-bold leading-tight"
                      style={{
                        color: "#FFFFFF",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="font-jakarta text-sm"
                      style={{
                        color: "rgba(255,255,255,0.95)",
                      }}
                    >
                      {member.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {/* Pill label */}
                    <span
                      className="rounded-full px-4 py-1.5 text-xs font-semibold"
                      style={{
                        color: "#FFFFFF",
                        border: "1px solid rgba(8, 145, 178, 0.40)",
                        background: "rgba(8, 145, 178, 0.35)",
                      }}
                    >
                      {member.pillLabel}
                    </span>
                    {/* Circle label */}
                    <span
                      className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full text-xs "
                      style={{
                        color: "#FFFFFF",

                        border: "1px solid #FFF",
                        background: "rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {member.circleLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
