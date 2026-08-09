"use client";

import Image from "next/image";

interface SectionImageSeparatorProps {
  /** Optional image source. If not provided, wave.svg is used. */
  imageSrc?: string;
  className?: string;
  direction?: "top" | "bottom";
  transform?: string;
  height?: number;
}

const DEFAULT_WAVE_SRC = "/images/wave.svg";

export function SectionImageSeparator({
  direction = "top",
  transform = "rotateX(0)",
  imageSrc = DEFAULT_WAVE_SRC,
  className = "",
}: SectionImageSeparatorProps) {
  return (
    <div
      className={`relative hidden lg:block   z-0 overflow-hidden  wave-container ${direction === "top" ? "mt-[0]" : ""} ${className}`}
      style={{
        alignSelf: "stretch",
        transform: transform,
      }}
      aria-hidden
    >
      <Image
        src={imageSrc}
        alt=""
        width={1506}
        height={88}
        className="absolute inset-0 h-full w-full wave-image object-bottom object-cover"
        style={direction === "bottom" ? { transform: "scaleY(-1)" } : undefined}
      />
    </div>
  );
}
