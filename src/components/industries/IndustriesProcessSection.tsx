"use client";

import Image from "next/image";
import type { IndustriesProcessData } from "@/data/industries-process";

interface IndustriesProcessSectionProps {
  data: IndustriesProcessData;
}

export default function IndustriesProcessSection({
  data,
}: IndustriesProcessSectionProps) {
  const { steps } = data;

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="container">
      <h3 className="mb-12 font-jakarta text-2xl font-bold leading-[1.3] tracking-[-0.36px] text-[#0f2233] sm:mb-16 sm:text-3xl lg:mb-20 lg:text-4xl">
        End-to-End Lifecycle
      </h3>
      <div className="relative mx-auto w-full max-w-full lg:max-w-[60%]">
        {/* Dashed wavy path connecting the steps */}
        <svg
          className="absolute left-0 top-1/2 h-[120px] w-full -translate-y-1/2"
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 0 60 Q 150 100, 250 50 T 500 70 T 750 40 T 1000 60"
            fill="none"
            stroke="#003859"
            strokeWidth="3"
            strokeDasharray="12 10"
            strokeLinecap="round"
          />
        </svg>

        {/* Steps - 4 columns */}
        <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Large light blue number */}
              <span
                className="font-jakarta text-[clamp(56px,8vw,128px)] font-bold leading-[1.2] tracking-[-0.36px] text-[#ABE0FF]"
                aria-hidden
              >
                {step.number}
              </span>
              {/* Icon + Label below number */}
              <div className="-mt-6 flex flex-col items-center gap-2 lg:-mt-8">
                <div className="relative h-12 w-12 shrink-0 lg:h-14 lg:w-14">
                  <Image
                    src={step.icon}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <p className="font-jakarta text-base font-bold leading-[1.3] tracking-[-0.36px] text-[#0f2233] lg:text-lg">
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
