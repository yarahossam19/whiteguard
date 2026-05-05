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
    <section className="relative hidden xl:block w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="container">
        <h3 className="mb-12 font-jakarta text-2xl font-bold leading-[1.3] tracking-[-0.36px] text-[#0f2233] sm:mb-16 sm:text-3xl lg:mb-20 lg:text-4xl">
          End-to-End Lifecycle
        </h3>
        <div className="relative mx-auto w-full max-w-full lg:max-w-[60%]">
          {/* Dashed wavy path connecting the steps */}
          <div className="w-[90%] mx-auto relative z-10 ">
            <svg
              className="absolute left-0 top-0 h-[220px] w-full  "
              width="742"
              height="96"
              viewBox="0 0 742 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M306.766 91.1284C346.368 76.8965 385.97 62.6645 407.454 54.8688C434.451 45.0726 439.242 42.6947 443.634 40.6649C452.03 36.7788 465.812 29.269 471.442 25.8235C472.703 25.1907 473.631 24.8813 474.587 24.5625"
                stroke="#005283"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="12 12"
              />
              <path
                d="M535.528 3C559.042 16.6132 574.868 25.7918 584.051 30.7749C596.391 37.471 605.516 40.8113 611.109 43.1364C630.722 51.2908 634.571 56.7403 639.109 60.0217C644.61 63.9997 652.047 68.5909 659.261 72.9927C665.171 76.5984 673.929 78.3039 683.938 79.2508C692.025 80.016 702.974 85.7855 711.45 88.3122C716.925 89.9444 722.7 90.492 726.774 92.0624C727.716 92.3765 728.645 92.6859 730.515 92.8453C732.385 93.0047 735.17 93.0047 738.039 93.0047"
                stroke="#005283"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="12 12"
              />
              <path
                d="M3.00049 32.0625C23.5984 44.2413 32.3458 46.7445 37.8257 48.7743C40.695 49.8371 43.3057 50.1853 50.5904 51.8916C68.625 56.116 83.9109 58.3139 90.3003 58.9326C102.704 60.1338 113.556 63.9204 123.288 66.5877C131.809 68.9231 138.908 68.9269 150.603 71.2708C172.383 75.6355 181.397 79.5587 187.833 80.0322C194.677 80.5356 204.517 82.6901 213.747 84.2464C224.131 84.5652 232.681 84.8746 236.422 85.3434C238.306 85.5028 240.163 85.5028 242.075 85.5028"
                stroke="#005283"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="12 12"
              />
            </svg>
          </div>

          {/* Steps - 4 columns */}
          <div className="relative  grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-32 ">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`relative  z-10 flex flex-col items-baseline justify-center gap-0 pb-18 lg:px-6 ${idx % 2 === 0 ? "md:translate-y-0" : "md:translate-y-16"} ${idx === 0 || idx === 3 ? "bg-[#fff]" : ""}`}
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
