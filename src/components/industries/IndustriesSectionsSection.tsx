"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { IndustriesSectionsData } from "@/data/industries-sections";
import { HoverSwapButton } from "../ui/HoverSwapButton";

interface IndustriesSectionsSectionProps {
  data: IndustriesSectionsData;
}

const INDUSTRY_ICONS: Record<
  string,
  (props: React.SVGProps<SVGSVGElement>) => React.ReactNode
> = {
  wallet: ({ className = "", color = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_2086_696)">
        <mask
          id="mask0_2086_696"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="14"
          height="14"
        >
          <path d="M14 0H0V14H14V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2086_696)">
          <path
            d="M8.66266 2.30365V4.52031H7.78766V2.30365C7.78766 2.14615 7.64766 2.07031 7.55433 2.07031C7.52516 2.07031 7.496 2.07615 7.46683 2.08781L2.841 3.83198C2.53183 3.94865 2.3335 4.24031 2.3335 4.57281V4.96365C1.80266 5.36031 1.4585 5.99615 1.4585 6.71365V4.57281C1.4585 3.87865 1.88433 3.26031 2.53183 3.01531L7.1635 1.26531C7.29183 1.21865 7.426 1.19531 7.55433 1.19531C8.13766 1.19531 8.66266 1.66781 8.66266 2.30365Z"
            fill="currentColor"
          />
          <path
            d="M12.5416 8.45768V9.04102C12.5416 9.19852 12.4191 9.32685 12.2558 9.33268H11.4041C11.0949 9.33268 10.8149 9.10518 10.7916 8.80185C10.7741 8.62102 10.8441 8.45185 10.9608 8.33518C11.0658 8.22435 11.2116 8.16602 11.3691 8.16602H12.2499C12.4191 8.17185 12.5416 8.30018 12.5416 8.45768Z"
            fill="currentColor"
          />
          <path
            d="M11.3635 7.55482H11.9585C12.2793 7.55482 12.5418 7.29232 12.5418 6.97148V6.71482C12.5418 5.50732 11.556 4.52148 10.3485 4.52148H3.65183C3.156 4.52148 2.701 4.68482 2.3335 4.96482C1.80266 5.36148 1.4585 5.99732 1.4585 6.71482V10.6407C1.4585 11.8482 2.44433 12.834 3.65183 12.834H10.3485C11.556 12.834 12.5418 11.8482 12.5418 10.6407V10.5298C12.5418 10.209 12.2793 9.94648 11.9585 9.94648H11.451C10.891 9.94648 10.3543 9.60232 10.2085 9.05982C10.086 8.61648 10.2318 8.19065 10.5235 7.90482C10.7393 7.68315 11.0368 7.55482 11.3635 7.55482ZM8.16683 7.43815H4.0835C3.84433 7.43815 3.646 7.23982 3.646 7.00065C3.646 6.76148 3.84433 6.56315 4.0835 6.56315H8.16683C8.406 6.56315 8.60433 6.76148 8.60433 7.00065C8.60433 7.23982 8.406 7.43815 8.16683 7.43815Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2086_696">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  healthcare: ({ className = "", color = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_2086_708)">
        <mask
          id="mask0_2086_708"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="14"
          height="14"
        >
          <path d="M14 0H0V14H14V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2086_708)">
          <path
            d="M12.8333 12.3945H1.16663C0.927459 12.3945 0.729126 12.5929 0.729126 12.832C0.729126 13.0712 0.927459 13.2695 1.16663 13.2695H12.8333C13.0725 13.2695 13.2708 13.0712 13.2708 12.832C13.2708 12.5929 13.0725 12.3945 12.8333 12.3945Z"
            fill="currentColor"
          />
          <path
            d="M9.91654 1.16602H4.08321C2.33321 1.16602 1.74988 2.21018 1.74988 3.49935V12.8327H5.24988V9.29768C5.24988 8.99435 5.49488 8.74935 5.79821 8.74935H8.20738C8.50488 8.74935 8.75571 8.99435 8.75571 9.29768V12.8327H12.2557V3.49935C12.2499 2.21018 11.6665 1.16602 9.91654 1.16602ZM8.45821 5.39518H7.43738V6.41602C7.43738 6.65518 7.23904 6.85352 6.99988 6.85352C6.76071 6.85352 6.56238 6.65518 6.56238 6.41602V5.39518H5.54154C5.30238 5.39518 5.10404 5.19685 5.10404 4.95768C5.10404 4.71852 5.30238 4.52018 5.54154 4.52018H6.56238V3.49935C6.56238 3.26018 6.76071 3.06185 6.99988 3.06185C7.23904 3.06185 7.43738 3.26018 7.43738 3.49935V4.52018H8.45821C8.69738 4.52018 8.89571 4.71852 8.89571 4.95768C8.89571 5.19685 8.69738 5.39518 8.45821 5.39518Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2086_708">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  manufacturing: ({ className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_2086_719)">
        <mask
          id="mask0_2086_719"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="14"
          height="14"
        >
          <path d="M14 0H0V14H14V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2086_719)">
          <path
            d="M11.7248 5.3785C10.669 5.3785 10.2373 4.63183 10.7623 3.716C11.0657 3.18517 10.8848 2.5085 10.354 2.20517L9.34484 1.62767C8.884 1.3535 8.289 1.51683 8.01484 1.97767L7.95067 2.0885C7.42567 3.00433 6.56234 3.00433 6.0315 2.0885L5.96734 1.97767C5.70484 1.51683 5.10984 1.3535 4.649 1.62767L3.63984 2.20517C3.109 2.5085 2.92817 3.191 3.2315 3.72183C3.76234 4.63183 3.33067 5.3785 2.27484 5.3785C1.66817 5.3785 1.1665 5.8743 1.1665 6.4868V7.51347C1.1665 8.12014 1.66234 8.6218 2.27484 8.6218C3.33067 8.6218 3.76234 9.36847 3.2315 10.2843C2.92817 10.8151 3.109 11.4918 3.63984 11.7951L4.649 12.3726C5.10984 12.6468 5.70484 12.4835 5.979 12.0226L6.04317 11.9118C6.56817 10.996 7.4315 10.996 7.96234 11.9118L8.0265 12.0226C8.30067 12.4835 8.89567 12.6468 9.35651 12.3726L10.3657 11.7951C10.8965 11.4918 11.0773 10.8093 10.774 10.2843C10.2432 9.36847 10.6748 8.6218 11.7307 8.6218C12.3373 8.6218 12.839 8.12597 12.839 7.51347V6.4868C12.8332 5.88014 12.3373 5.3785 11.7248 5.3785ZM6.99984 8.89597C5.95567 8.89597 5.104 8.0443 5.104 7.00014C5.104 5.95597 5.95567 5.10433 6.99984 5.10433C8.044 5.10433 8.89567 5.95597 8.89567 7.00014C8.89567 8.0443 8.044 8.89597 6.99984 8.89597Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2086_719">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  insurance: ({ className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_2086_729)">
        <mask
          id="mask0_2086_729"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="14"
          height="14"
        >
          <path d="M14 0H0V14H14V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2086_729)">
          <path
            d="M11.906 4.05984V5.12734C11.906 5.50068 11.731 5.85071 11.4277 6.06654L5.01103 10.7682C4.59686 11.0715 4.03103 11.0715 3.62269 10.7624L2.78269 10.1324C2.40353 9.84654 2.09436 9.22821 2.09436 8.75571V4.05984C2.09436 3.40651 2.59603 2.68318 3.20853 2.45568L6.39937 1.25984C6.73187 1.13734 7.26853 1.13734 7.60103 1.25984L10.7919 2.45568C11.4044 2.68318 11.906 3.40651 11.906 4.05984Z"
            fill="currentColor"
          />
          <path
            d="M10.9786 7.19849C11.3636 6.91849 11.9061 7.19266 11.9061 7.67099V8.76766C11.9061 9.24016 11.5969 9.85266 11.2178 10.1385L8.02693 12.5243C7.74693 12.7285 7.37359 12.8335 7.00026 12.8335C6.62693 12.8335 6.25359 12.7285 5.97359 12.5185L5.48943 12.1568C5.17443 11.9235 5.17443 11.451 5.49527 11.2177L10.9786 7.19849Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2086_729">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  automotive: ({ className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_2086_740)">
        <mask
          id="mask0_2086_740"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="14"
          height="14"
        >
          <path d="M14 0H0V14H14V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2086_740)">
          <path
            d="M7 10.9368C6.76083 10.9368 6.5625 10.7385 6.5625 10.4993V9.91602C6.5625 9.67685 6.76083 9.47852 7 9.47852C7.23917 9.47852 7.4375 9.67685 7.4375 9.91602V10.4993C7.4375 10.7385 7.23917 10.9368 7 10.9368Z"
            fill="currentColor"
          />
          <path
            d="M7 13.2708C6.76083 13.2708 6.5625 13.0725 6.5625 12.8333V12.25C6.5625 12.0108 6.76083 11.8125 7 11.8125C7.23917 11.8125 7.4375 12.0108 7.4375 12.25V12.8333C7.4375 13.0725 7.23917 13.2708 7 13.2708Z"
            fill="currentColor"
          />
          <path
            d="M1.16672 13.2701C1.13172 13.2701 1.09672 13.2642 1.06172 13.2584C0.82839 13.2001 0.682557 12.9609 0.74089 12.7276L1.32422 10.3942C1.38256 10.1609 1.61589 10.0151 1.85506 10.0734C2.08839 10.1317 2.23422 10.3709 2.17589 10.6042L1.59256 12.9376C1.54006 13.1359 1.36506 13.2701 1.16672 13.2701Z"
            fill="currentColor"
          />
          <path
            d="M12.689 13.1259C12.4907 13.1259 12.3157 12.9917 12.2632 12.7934L11.6798 10.4601C11.6215 10.2267 11.7615 9.98755 12.0007 9.92922C12.234 9.87088 12.4732 10.0109 12.5315 10.2501L13.1148 12.5834C13.1732 12.8167 13.0332 13.0559 12.794 13.1142C12.759 13.1201 12.724 13.1259 12.689 13.1259Z"
            fill="currentColor"
          />
          <path
            d="M11.1648 3.09036C11.1648 3.26536 11.019 3.40536 10.8498 3.40536H3.22564C3.05064 3.40536 2.91064 3.25953 2.91064 3.09036C2.91064 2.91536 3.05648 2.77536 3.22564 2.77536H3.65731L3.82064 2.0112C3.97231 1.26453 4.28731 0.582031 5.54731 0.582031H8.51648C9.77648 0.582031 10.0973 1.26453 10.249 2.00536L10.4123 2.76953H10.844C11.019 2.76953 11.1648 2.91536 11.1648 3.09036Z"
            fill="currentColor"
          />
          <path
            d="M11.3456 5.48185C11.2814 4.78185 11.0948 4.04102 9.73559 4.04102H4.33393C2.97476 4.04102 2.79393 4.78768 2.72393 5.48185L2.48476 8.06019C2.45559 8.38102 2.56059 8.70185 2.78226 8.94685C3.00976 9.19185 3.32476 9.33185 3.66309 9.33185H4.45643C5.14476 9.33185 5.27309 8.94102 5.36059 8.67852L5.44809 8.42185C5.54726 8.13019 5.57059 8.06019 5.94976 8.06019H8.11976C8.49893 8.06019 8.51059 8.10102 8.62142 8.42185L8.70893 8.67852C8.79059 8.94102 8.92476 9.33185 9.60726 9.33185H10.4006C10.7331 9.33185 11.0539 9.19185 11.2814 8.94685C11.5031 8.70769 11.6081 8.38102 11.5789 8.06019L11.3456 5.48185ZM5.76309 6.36852H4.49726C4.32226 6.36852 4.18226 6.22269 4.18226 6.05352C4.18226 5.88435 4.32809 5.73852 4.49726 5.73852H5.76893C5.94393 5.73852 6.08393 5.88435 6.08393 6.05352C6.08393 6.22269 5.93809 6.36852 5.76309 6.36852ZM9.57226 6.36852H8.30059C8.12559 6.36852 7.98559 6.22269 7.98559 6.05352C7.98559 5.88435 8.13143 5.73852 8.30059 5.73852H9.57226C9.74726 5.73852 9.88726 5.88435 9.88726 6.05352C9.88726 6.22269 9.74726 6.36852 9.57226 6.36852Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2086_740">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  cloud: ({ className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <g clipPath="url(#clip0_2086_756)">
        <mask
          id="mask0_2086_756"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="14"
          height="14"
        >
          <path d="M14 0H0V14H14V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_2086_756)">
          <path
            d="M12.6815 7.53151C12.5298 7.02984 12.279 6.59234 11.9465 6.23651C11.5207 5.75232 10.9548 5.41982 10.319 5.27398C9.99817 3.81565 9.09984 2.76565 7.82234 2.37482C6.434 1.94315 4.824 2.36315 3.81484 3.41898C2.92817 4.34648 2.6365 5.62398 2.98067 6.98317C1.814 7.26901 1.2365 8.24317 1.17234 9.17067C1.1665 9.23484 1.1665 9.29317 1.1665 9.35151C1.1665 10.4482 1.884 11.679 3.48234 11.7957H9.53734C10.3657 11.7957 11.159 11.4865 11.7657 10.9323C12.7165 10.0982 13.0665 8.79734 12.6815 7.53151Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_2086_756">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
};

export default function IndustriesSectionsSection({
  data,
}: IndustriesSectionsSectionProps) {
  const { header, industries } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target,
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full ">
      {/* Top header - dark background */}
      <div className="px-6 pt-0 pb-8 text-center sm:px-12 lg:px-[7vw]">
        <h2 className="font-jakarta text-lg font-bold uppercase tracking-widest  text-[#003859] sm:text-2xl">
          {header.title}
        </h2>
        <p className="mx-auto mt-4 lg:max-w-[636px] font-jakarta text-base font-normal leading-relaxed text-[#52697A] sm:text-lg">
          {header.subtitle}
        </p>
      </div>

      {/* Main layout: sticky nav + content */}
      <div className="relative flex flex-col lg:flex-row gap-50">
        {/* Sticky left nav - circles - scrolls with page, click scrolls to section */}
        <div className="sticky top-24 z-20 shrink-0 self-start">
          <nav
            className="flex flex-row justify-center gap-4 py-4 lg:flex-col lg:items-center lg:gap-6 lg:py-8 lg:pl-[4vw]"
            aria-label="Industry sections"
          >
            {industries.map((industry, index) => {
              const IconComponent =
                INDUSTRY_ICONS[industry.icon] || INDUSTRY_ICONS.cloud;
              return (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => scrollToSection(index)}
                  className={`group flex h-10 w-10 items-center justify-center rounded-full border border-[#C2CDD6] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0a1628] ${
                    activeIndex === index
                      ? "scale-110 bg-[#003859] text-white"
                      : "bg-transparent text-[#859CAD] hover:scale-105 hover:text-[#859CAD]"
                  }`}
                  aria-label={`Go to ${industry.title}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                >
                  <IconComponent className="h-5 w-5 shrink-0" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main white content block */}
        <div className="flex-1 px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto  rounded-2xl   ">
            {industries.map((industry, index) => {
              const IconComponent =
                INDUSTRY_ICONS[industry.icon] || INDUSTRY_ICONS.cloud;
              const imageSrc =
                "image" in industry && typeof industry.image === "string"
                  ? industry.image
                  : "/images/industries/technology.png";
              return (
                <motion.article
                  key={industry.id}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  id={industry.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex flex-col gap-10 px-6 py-12 lg:flex-row lg:items-stretch lg:gap-12 lg:px-5"
                >
                  {/* Left: Industry image */}
                  <div className="relative flex shrink-0 items-center justify-center lg:w-1/2">
                    <div
                      className="relative  "
                      style={{
                        borderRadius: "16px",
                        background: "#FFF",
                        boxShadow:
                          "0 121px 34px 0 rgba(0, 0, 0, 0.00), 0 77px 31px 0 rgba(0, 0, 0, 0.01), 0 44px 26px 0 rgba(0, 0, 0, 0.05), 0 19px 19px 0 rgba(0, 0, 0, 0.09), 0 5px 11px 0 rgba(0, 0, 0, 0.10)",
                        display: "flex",
                        width: "100%",
                        height: "600px",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={imageSrc}
                        alt={industry.title}
                        fill
                        className="object-contain w-full h-full"
                        sizes="(max-width: 1024px) 160px, 192px"
                      />
                    </div>
                  </div>
                  {/* Right: Content */}
                  <div className="flex min-h-0 shrink flex-1 flex-col justify-between lg:min-h-[600px]">
                    <div className="flex flex-col gap-12">
                      <div className="flex flex-col justify-stretch gap-6">
                        <h3 className="font-jakarta text-4xl font-bold text-[#003859]">
                          {industry.title}
                        </h3>
                        <p className="font-jakarta text-base leading-relaxed text-[#52697A]">
                          {industry.description}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {industry.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 font-jakarta text-base text-[#003859]"
                          >
                            <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#00C3FF]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <HoverSwapButton
                      href={industry.ctaHref}
                      label={industry.ctaLabel}
                      hoverLabel={industry.ctaLabel}
                      variant="cta"
                      showChevrons={false}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
