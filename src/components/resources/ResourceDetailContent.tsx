"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface TocItem {
  id: string;
  label: string;
}

interface Section {
  id: string;
  headline: string;
  body: string;
}

interface ResourceDetailContentProps {
  title: string;
  toc: TocItem[];
  sections: Section[];
}

export default function ResourceDetailContent({
  title,
  toc,
  sections,
}: ResourceDetailContentProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    const sectionIds = toc.map((t) => t.id);

    const updateActiveSection = () => {
      const headerOffset = 100;
      const scrollPos = window.scrollY + headerOffset;

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { offsetTop } = el;
        if (offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [toc]);

  return (
    <div className="container my-14">
      {/* Back + Title row - gap 200px, pl 97px */}
      <div className="mb-12 flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-[200px] xl:pl-0">
        <Link
          href="/resources"
          className="hidden xl:flex w-fit items-center gap-[13px] rounded-[8px] px-[13px] py-[10px] font-jakarta text-[18px] font-bold leading-[28px] text-[#003859] transition-colors hover:opacity-80"
        >
          <Image
            src="/images/icons/arrow-right-2.svg"
            alt=""
            width={20}
            height={20}
          />
          Back
        </Link>
        <h1 className="font-jakarta text-[clamp(18px,3vw,30px)] font-normal leading-[1.2] tracking-[-0.4px] text-[#003859] xl:max-w-full">
          {title}
        </h1>
      </div>

      {/* Two-column: TOC (232px) + Article (1009px) */}
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-[80px]">
        {/* Table of Contents - sticky, scroll spy */}
        <nav
          className="w-full hidden xl:block shrink-0 xl:sticky xl:top-24 xl:self-start xl:w-[232px]"
          aria-label="Table of contents"
        >
          <ul className="flex flex-col gap-5">
            {toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`flex items-center justify-between gap-4 px-[13px] py-[10px] font-jakarta text-[18px] font-normal leading-[24px] tracking-[0px] transition-colors hover:text-[#003859] ${
                      isActive
                        ? "border-b border-[#29343d] text-[#29343d] font-medium"
                        : "text-[#52697A]"
                    }`}
                  >
                    {item.label}
                    <Image
                      src="/images/icons/arrow-right-2.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="shrink-0 rotate-180"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Article body - max 1009px */}
        <article className="min-w-0 flex-1">
          <div className="flex flex-col gap-[34px]">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="flex flex-col gap-4 scroll-mt-24"
              >
                <h2 className="font-jakarta text-base xl:text-[24px] font-medium leading-[1.2] tracking-[-0.2px] text-[#003859]">
                  {section.headline}
                </h2>
                <p className="font-jakarta text-[16px] font-normal leading-[30px] tracking-[-0.15px] text-[#29343D]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
