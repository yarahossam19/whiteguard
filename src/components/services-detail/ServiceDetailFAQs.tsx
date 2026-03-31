"use client";

import { useState } from "react";
import Image from "next/image";

interface ServiceDetailFAQsProps {
  faqs: { question: string; description: string }[];
}

export default function ServiceDetailFAQs({ faqs }: ServiceDetailFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white pb-20 lg:pb-40">
      <div className="container">
      <div className="mx-auto max-w-[768px]">
        <h2 className="mb-12 text-center font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
          FAQs
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-[14px] bg-[rgba(224,230,235,0.25)] "
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[rgba(224,230,235,0.4)] cursor-pointer"
              >
                <span className="font-jakarta text-[15px] font-normal leading-[22.5px] text-[#003859]">
                  {faq.question}
                </span>
                <Image
                  src="/images/icons/ChevronDown.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={`shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[rgba(224,230,235,0.5)] px-6 py-4">
                    <p className="font-jakarta text-[15px] font-normal leading-[24px] text-[#52697a]">
                      {faq.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
