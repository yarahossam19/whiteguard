"use client";

import { useMediaQuery } from "react-responsive";

interface SectionSeparatorProps {
  /** Optional video source. If provided, video is used; otherwise SVG wave is shown. */
  videoSrc?: string;
  className?: string;
  direction?: "top" | "bottom";
  transform?: string;
}

export function SectionVideoSeparator({
  direction = "top",
  transform = "rotateX(0)",
  videoSrc,
  className = "",
}: SectionSeparatorProps) {
  const height = 300;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (videoSrc) {
    return (
      <div
        className={`relative ${direction === "top" ? (!isMobile ? "mt-[-240px]" : "mt-[-100px]") : " "} z-0 overflow-hidden ${className} `}
        style={{
          height: `${height}px`,
          alignSelf: "stretch",
          transform: transform,
        }}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute  inset-0 h-full w-full object-cover"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px`, alignSelf: "stretch" }}
      aria-hidden
    >
      <svg
        className="block h-full w-full"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White top - wavy bottom edge (organic irregular waves) */}
        <path
          d="M0,0 L1440,0 L1440,70 C1200,95 1000,45 720,65 C440,85 280,35 0,60 L0,0 Z"
          fill="white"
        />
        {/* Light blue bottom - complementary wavy top */}
        <path
          d="M0,60 C280,35 440,85 720,65 C1000,45 1200,95 1440,70 L1440,150 L0,150 Z"
          fill="#ABE0FF"
        />
      </svg>
    </div>
  );
}
