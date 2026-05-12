"use client";

import Link from "next/link";
import { useState } from "react";
import type { ServicesPageFaqSectionData } from "@/data/services-page-faq";

interface ServicesPageFAQSectionProps {
  data: ServicesPageFaqSectionData;
}

export default function ServicesPageFAQSection({ data }: ServicesPageFAQSectionProps) {
  const { heading, subtitle, items, footer } = data;
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      className="relative w-full bg-[#fbfdfe] py-14 sm:py-16 xl:py-20"
      aria-labelledby="services-faq-heading"
    >
      <div className="container mx-auto flex max-w-[1200px] flex-col gap-10 xl:gap-12">
        <header className="flex flex-col gap-3 sm:gap-[14px] text-center xl:gap-[14px]">
          <h2
            id="services-faq-heading"
            className="mx-auto font-jakarta text-[clamp(28px,4.2vw,43px)] font-bold leading-[1.26] tracking-tight text-[#003859] xl:leading-[54px]"
          >
            {heading}
          </h2>
          <p className="mx-auto max-w-[760px] px-2 font-jakarta text-base font-normal leading-7 text-[#52697A] xl:text-[17px] xl:leading-[28px]">
            {subtitle}
          </p>
        </header>

        <div className="flex w-full flex-col gap-2 sm:gap-[10px]">
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.question}
                className={
                  open
                    ? "flex w-full shrink-0 flex-col gap-[18px] rounded-[9px] border-2 border-[#0fa1ed] bg-[#feffff] px-[24px] py-5 shadow-[0px_18px_17px_rgba(0,56,89,0.08)] sm:px-[28px] sm:py-[26px]"
                    : ""
                }
              >
                {!open ? (
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex min-h-[72px] w-full shrink-0 items-center justify-between gap-4 rounded-[7px] bg-[#f2f6f9] px-[24px] text-left text-[#141a1f] transition-colors hover:bg-[#e9eef3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006dad] sm:px-[28px]"
                    aria-expanded={false}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                  >
                    <span className="max-w-[min(100%-2rem,880px)] font-jakarta text-[15px] font-medium leading-6 text-[#141a1f] sm:text-[17px] sm:leading-[24px]">
                      {item.question}
                    </span>
                    <span
                      className="shrink-0 font-jakarta text-[22px] font-semibold leading-[23px] text-[#141a1f]"
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="flex min-h-[28px] w-full shrink-0 items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006dad]"
                      aria-expanded={true}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                    >
                      <span className="max-w-[min(100%-2rem,860px)] font-jakarta text-[17px] font-bold leading-[28px] text-[#141a1f] sm:text-[19px]">
                        {item.question}
                      </span>
                      <span
                        className="shrink-0 font-jakarta text-2xl font-semibold leading-6 text-[#006dad]"
                        aria-hidden
                      >
                        −
                      </span>
                    </button>
                    <p
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      className="w-full font-jakarta text-[14px] font-normal leading-[25px] text-[#141a1f] sm:text-[14.8px]"
                    >
                      {item.answer}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-6 rounded-[8px] bg-[#ebeef1] px-[24px] py-6 sm:flex-row sm:items-center sm:justify-between sm:px-[28px] sm:py-6 xl:min-h-[126px]">
          <div className="flex max-w-[650px] flex-col gap-3 sm:flex-row sm:gap-4">
            <div
              className="flex size-[24px] shrink-0 flex-col items-center justify-center rounded-[12px] bg-[#003859]"
              aria-hidden
            >
              <span className="font-jakarta text-[13px] font-bold leading-4 text-[#feffff]">
                i
              </span>
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <p className="font-jakarta text-lg font-bold leading-7 text-[#003859] sm:text-[22px] sm:leading-[28px]">
                {footer.title}
              </p>
              <p className="max-w-[580px] font-jakarta text-[13px] font-normal leading-[22px] text-[rgba(28,41,51,0.75)] sm:text-[13.5px]">
                {footer.subtitle}
              </p>
            </div>
          </div>
          <Link
            href={footer.buttonHref}
            className="inline-flex w-full shrink-0 items-center justify-center gap-4 self-stretch whitespace-nowrap rounded-[8px] bg-[#e7f6ff] px-6 py-3 font-jakarta text-base font-normal leading-tight tracking-wide text-[#006dad] transition-colors hover:bg-[#d9f0ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006dad] sm:w-auto sm:self-center sm:px-6 sm:py-[12px] sm:text-lg"
          >
            {footer.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
