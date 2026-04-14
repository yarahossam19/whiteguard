"use client";

import React from "react";
import Image from "next/image";
import type { AboutMilestonesData } from "@/data/about-milestones";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface MilestonesSectionProps {
  data: AboutMilestonesData;
}

const ICONS: Record<
  string,
  (props: { className?: string; color?: string }) => React.ReactElement
> = {
  flag: ({ className = "", color = "currentColor" }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  users: ({ className = "", color = "currentColor" }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.4768 12.8896L16.9918 21.4156C17.0087 21.516 16.9946 21.6192 16.9514 21.7114C16.9081 21.8036 16.8377 21.8803 16.7497 21.9314C16.6616 21.9825 16.56 22.0055 16.4586 21.9974C16.3571 21.9892 16.2605 21.9502 16.1818 21.8856L12.6018 19.1986C12.4289 19.0695 12.219 18.9998 12.0033 18.9998C11.7875 18.9998 11.5776 19.0695 11.4048 19.1986L7.81875 21.8846C7.74007 21.9491 7.64361 21.988 7.54225 21.9962C7.44088 22.0044 7.33942 21.9815 7.25141 21.9305C7.16341 21.8796 7.09303 21.803 7.04967 21.711C7.00631 21.619 6.99204 21.516 7.00875 21.4156L8.52275 12.8896"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  rocket: ({ className = "", color = "currentColor" }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  trophy: ({ className = "", color = "currentColor" }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
};

export default function MilestonesSection({ data }: MilestonesSectionProps) {
  const { heading, subtitle, milestones } = data;

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
        className="z-[-1]"
      />
      <section
        className="relative w-full py-16 lg:py-24"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="container">
          <div className="mx-auto lg:max-w-[900px]">
            {/* Heading */}
            <div className="mb-16 flex flex-col items-center gap-6 text-center">
              <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
                <span className="text-[#003859]">{heading.line1}</span>
                <span className="text-[#0087D7]">{heading.line2}</span>
              </h2>
              <p className="max-w-[434px] font-jakarta text-base leading-[1.8] text-[#52697A]">
                {subtitle}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical dashed line */}

              {/* Milestones */}
              <div className="flex flex-col gap-12 lg:gap-20">
                {milestones.map((milestone) => {
                  const isLeft = milestone.side === "left";
                  const isActive = isLeft;
                  const IconComponent = ICONS[milestone.icon] || ICONS.flag;

                  return (
                    <div
                      key={milestone.id}
                      className="relative flex flex-col lg:flex-row min-h-[200px] items-stretch lg:min-h-[180px]"
                    >
                      {/* Left area: card when left, empty when right */}
                      <div
                        className={`flex flex-1 items-center ${
                          isLeft
                            ? "justify-end  gap-2 pr-2 lg:gap-3 lg:pr-4"
                            : "justify-center lg:justify-end"
                        }`}
                      >
                        {isLeft && (
                          <>
                            <Image
                              src="/images/icons/left.png"
                              alt=""
                              width={24}
                              height={24}
                              className="hidden shrink-0 lg:block"
                              aria-hidden
                            />
                            <div
                              className="w-full max-w-[420px] rounded-[28px] p-8 text-right transition-all duration-300"
                              style={{
                                borderRadius: "24px",
                                background:
                                  "linear-gradient(135deg, #003859 0%, #004A73 100%)",
                                boxShadow:
                                  "0 16px 50px 0 rgba(0, 56, 89, 0.20)",
                              }}
                            >
                              <MilestoneCardContent
                                milestone={milestone}
                                isActive={isActive}
                                isLeft={isLeft}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Center: timeline node */}
                      <div className="relative mx-10 z-10 hidden lg:flex shrink-0 -translate-y-29 items-center justify-center">
                        <div
                          className="relative flex items-center justify-center"
                          style={{
                            display: "flex",
                            height: "56px",
                            width: "56px",

                            flexShrink: 0,
                            borderRadius: "16px",
                            background:
                              "linear-gradient(135deg, #003859 0%, #0891B2 100%)",
                            boxShadow:
                              "0 0 0 6px rgba(0, 56, 89, 0.08), 0 8px 20px 0 rgba(0, 56, 89, 0.20)",
                          }}
                        >
                          <IconComponent color="#fff" />
                          <div
                            className="absolute left-1/2 top-full hidden w-px -translate-x-1/2 lg:block"
                            style={{
                              width: "2px",
                              height: "80px",
                              background:
                                "linear-gradient(180deg, #003859 0%, #0891B2 100%)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Right area: arrow outside + card when right */}
                      <div
                        className={`flex flex-1 items-center ${
                          isLeft
                            ? "justify-center lg:justify-start"
                            : "justify-start gap-2 lg:gap-3 lg:pl-2"
                        }`}
                      >
                        {!isLeft && (
                          <>
                            <div
                              className="w-full max-w-[420px] rounded-[28px] p-8 text-left transition-all duration-300"
                              style={{
                                borderRadius: "24px",
                                border: "1px solid rgba(8, 145, 178, 0.15)",
                                background:
                                  "linear-gradient(145deg, #F0F9FF 6.17%, #E0F2FE 93.83%)",
                                boxShadow: "0 8px 30px 0 rgba(0, 56, 89, 0.07)",
                              }}
                            >
                              <MilestoneCardContent
                                milestone={milestone}
                                isActive={isActive}
                                isLeft={isLeft}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave-bottom.mp4"
      />
    </>
  );
}

function MilestoneCardContent({
  milestone,
  isActive,
  isLeft,
}: {
  milestone: AboutMilestonesData["milestones"][number];
  isActive: boolean;
  isLeft: boolean;
}) {
  return (
    <div className="relative z-10">
      <span
        className=" mb-4 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold"
        style={{
          background: isLeft
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 56, 89, 0.10)",
          color: isLeft ? "rgba(255, 255, 255, 0.80)" : "rgba(0, 56, 89, 0.60)",
        }}
      >
        {milestone.year}
      </span>
      {!isLeft ? (
        <Image
          src="/images/icons/left.png"
          alt=""
          width={24}
          height={24}
          className="hidden shrink-0 lg:block"
          aria-hidden
          style={{
            left: "-14%",
            top: "1%",
            position: "absolute",
            zIndex: -1,
          }}
        />
      ) : (
        <Image
          src="/images/icons/right.png"
          alt=""
          width={24}
          height={24}
          className="hidden shrink-0 lg:block"
          aria-hidden
          style={{
            right: "-15.5%",
            top: "1%",
            position: "absolute",
            zIndex: -1,
          }}
        />
      )}
      <h3
        className="mb-3 font-jakarta text-xl font-bold leading-tight"
        style={{
          color: isActive ? "#FFFFFF" : "#003859",
        }}
      >
        {milestone.title}
      </h3>
      <p
        className="mb-6 font-jakarta text-sm leading-[1.75]"
        style={{
          color: isActive
            ? "rgba(255, 255, 255, 0.65)"
            : "rgba(0, 56, 89, 0.55)",
        }}
      >
        {milestone.description}
      </p>
      {milestone.metricValue && (
        <p
          className="font-jakarta  "
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.10)",
            paddingTop: "10px",
          }}
        >
          <span
            className="font-extrabold text-2xl"
            style={{
              color: isActive ? "#FFFFFF" : "#003859",
            }}
          >
            {milestone.metricValue}{" "}
          </span>
          <span
            className="font-medium  text-xs"
            style={{
              color: isActive
                ? "rgba(255, 255, 255, 0.45)"
                : "rgba(0, 56, 89, 0.45)",
            }}
          >
            {milestone.metricLabel}
          </span>
        </p>
      )}
    </div>
  );
}
