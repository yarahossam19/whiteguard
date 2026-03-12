"use client";

import type { AboutMissionData } from "@/data/about-mission";
import { SectionImageSeparator } from "../ui/SectionImageSeparator";
import { useState } from "react";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface MissionSectionProps {
  data: AboutMissionData;
}

function EyeIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 88 88"
      fill="none"
    >
      <path
        d="M7.51597 45.0198C7.21212 44.2012 7.21212 43.3008 7.51597 42.4823C10.4753 35.3067 15.4986 29.1715 21.949 24.8543C28.3994 20.5371 35.9864 18.2324 43.7483 18.2324C51.5101 18.2324 59.0971 20.5371 65.5475 24.8543C71.9979 29.1715 77.0212 35.3067 79.9806 42.4823C80.2844 43.3008 80.2844 44.2012 79.9806 45.0198C77.0212 52.1953 71.9979 58.3306 65.5475 62.6477C59.0971 66.9649 51.5101 69.2696 43.7483 69.2696C35.9864 69.2696 28.3994 66.9649 21.949 62.6477C15.4986 58.3306 10.4753 52.1953 7.51597 45.0198Z"
        stroke={color}
        strokeWidth="7.29167"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.75 54.6875C49.7906 54.6875 54.6875 49.7906 54.6875 43.75C54.6875 37.7094 49.7906 32.8125 43.75 32.8125C37.7094 32.8125 32.8125 37.7094 32.8125 43.75C32.8125 49.7906 37.7094 54.6875 43.75 54.6875Z"
        stroke={color}
        strokeWidth="7.29167"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 88 88"
      fill="none"
    >
      <path
        d="M43.7503 80.2087C63.8857 80.2087 80.2087 63.8857 80.2087 43.7503C80.2087 23.6149 63.8857 7.29199 43.7503 7.29199C23.6149 7.29199 7.29199 23.6149 7.29199 43.7503C7.29199 63.8857 23.6149 80.2087 43.7503 80.2087Z"
        stroke={color}
        strokeWidth="7.29167"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.75 65.625C55.8312 65.625 65.625 55.8312 65.625 43.75C65.625 31.6688 55.8312 21.875 43.75 21.875C31.6688 21.875 21.875 31.6688 21.875 43.75C21.875 55.8312 31.6688 65.625 43.75 65.625Z"
        stroke={color}
        strokeWidth="7.29167"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.7497 51.0413C47.7768 51.0413 51.0413 47.7768 51.0413 43.7497C51.0413 39.7226 47.7768 36.458 43.7497 36.458C39.7226 36.458 36.458 39.7226 36.458 43.7497C36.458 47.7768 39.7226 51.0413 43.7497 51.0413Z"
        stroke={color}
        strokeWidth="7.29167"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MissionSection({ data }: MissionSectionProps) {
  const { heading, vision, mission } = data;
  const [activeCard, setActiveCard] = useState<"vision" | "mission">("vision");

  const isVisionActive = activeCard === "vision";
  const isMissionActive = activeCard === "mission";

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />
      <section
        id="about-story"
        className="relative z-0 w-full px-6 py-16 lg:px-[7vw] lg:py-24"
        style={{
          background:
            "linear-gradient(180deg, #ABE0FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 lg:gap-16">
          {/* Heading */}
          <h2 className="text-center font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
            <span className="text-[#003859]">{heading.line1}</span>
            <span className="text-[#0891B2]">{heading.line2}</span>
          </h2>

          {/* Cards */}
          <div
            className="grid w-full max-w-[1000px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0"
            onMouseLeave={() => setActiveCard("vision")}
          >
            {/* Vision Card - initial active */}
            <div
              className="flex flex-col items-center p-6 transition-all duration-300 lg:p-[50px]"
              style={{
                background: isVisionActive ? "transparent" : "#E9EDF1",
                boxShadow: !isVisionActive
                  ? "0 8px 24px rgba(0, 56, 89, 0.08)"
                  : "unset",
                borderRadius: "16px 0 0 16px",
              }}
              onMouseEnter={() => setActiveCard("vision")}
            >
              <span
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: isVisionActive ? "#0891B2" : "#6B7280",
                }}
              >
                {vision.label}
              </span>
              <div className="mb-4">
                <EyeIcon color={isVisionActive ? "#003859" : "#6B7280"} />
              </div>
              <h3
                className="mb-4 text-center font-jakarta text-xl font-bold leading-normal"
                style={{
                  color: isVisionActive ? "#003859" : "#6B7280",
                }}
              >
                {vision.title}
              </h3>
              <p
                className="text-center font-jakarta text-lg leading-[1.75]"
                style={{
                  color: isVisionActive ? "#52697A" : "#9CA3AF",
                }}
              >
                {vision.description}
              </p>
            </div>

            {/* Mission Card */}
            <div
              className="flex flex-col items-center p-6 transition-all duration-300 lg:p-[50px]"
              style={{
                background: isMissionActive ? "transparent" : "#E9EDF1",
                boxShadow: !isMissionActive
                  ? "0 8px 24px rgba(0, 56, 89, 0.08)"
                  : "unset",
                borderRadius: " 0 16px 16px  0",
              }}
              onMouseEnter={() => setActiveCard("mission")}
            >
              <span
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: isMissionActive ? "#0891B2" : "#6B7280",
                }}
              >
                {mission.label}
              </span>
              <div className="mb-4">
                <TargetIcon color={isMissionActive ? "#003859" : "#6B7280"} />
              </div>
              <h3
                className="mb-4 text-center font-jakarta text-xl font-bold leading-normal"
                style={{
                  color: isMissionActive ? "#003859" : "#6B7280",
                }}
              >
                {mission.title}
              </h3>
              <p
                className="text-center font-jakarta text-lg leading-[1.75]"
                style={{
                  color: isMissionActive ? "#52697A" : "#9CA3AF",
                }}
              >
                {mission.description}
              </p>
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
