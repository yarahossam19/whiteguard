"use client";

import Image from "next/image";
import Link from "next/link";

interface HoverSwapButtonProps {
  href: string;
  label: string;
  hoverLabel: string;
  showChevrons?: boolean;
  variant?: "nav" | "cta" | "secondary";
  className?: string;
}

function ChevronIcon() {
  return (
    <Image
      src="/images/icons/arrow-bottom.png"
      alt=""
      width={16}
      height={16}
      className="shrink-0"
      aria-hidden
    />
  );
}

/**
 * Button with hover text swap.
 * cta (dark): gradient + glow. secondary (light): white bg + blue border.
 */
export function HoverSwapButton({
  href,
  label,
  hoverLabel,
  showChevrons = true,
  variant = "nav",
  className = "",
}: HoverSwapButtonProps) {
  const isNav = variant === "nav";
  const isSecondary = variant === "secondary";

  if (isSecondary) {
    return (
      <Link
        href={href}
        className="group inline-flex rounded-lg p-[2.5px] font-ano font-normal text-[#002439]"
        style={{
          background: "linear-gradient(180deg, #0087D7 0%, #81D0FF 100%)",
        }}
      >
        <span
          className={`flex items-center justify-center gap-2 rounded-[5px] bg-white px-6 py-3 text-lg transition-colors duration-300 ease-out group-hover:bg-[#ABE0FF]/30 ${className}`}
        >
          {showChevrons && <ChevronIcon />}
          <span className="relative h-6 overflow-hidden">
            <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
              <span className="flex h-6 items-center justify-center">
                {label}
              </span>
              <span className="flex h-6 items-center justify-center">
                {hoverLabel}
              </span>
            </span>
          </span>
          {showChevrons && <ChevronIcon />}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-[12px] font-ano font-normal duration-300 ease-out ${
        isNav ? "px-5 py-2.5 text-base" : "px-6 py-3 text-lg"
      } ${className}`}
    >
      {/* Dark: border 1px #0087D7, gradient, box-shadow */}
      <span
        className="absolute inset-0 rounded-[12px] border border-[#0087D7] bg-gradient-to-b from-[#003859] to-[#006DAD] transition-opacity duration-300 ease-out group-hover:opacity-0"
        style={{
          boxShadow:
            "0 1px 18px 2px #D2EAFF inset, 0 1px 4px 2px #D2EAFF inset, 0 42px 107px 0 rgba(87, 177, 255, 0.34), 0 24.721px 32.257px 0 rgba(87, 177, 255, 0.19), 0 10.268px 13.398px 0 rgba(87, 177, 255, 0.22), 0 3.714px 4.846px 0 rgba(87, 177, 255, 0.15), 0 0 0 4px #E0E9F2, 0 0 0 5px #FFF",
        }}
      />
      {/* Hover: Light blue glossy */}
      <span className="absolute inset-0 rounded-[12px] border-2 border-[#57B1FF] bg-gradient-to-b from-[#E8F7FF] to-[#ABE0FF] opacity-0 shadow-[0px_0px_24px_rgba(171,224,255,0.6)] transition-opacity duration-300 ease-out group-hover:opacity-100" />

      {/* Text: default white, hover dark blue */}
      <span className="relative z-10 flex items-center gap-2">
        {showChevrons && <ChevronIcon />}
        <span className="relative h-6 overflow-hidden">
          <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
            <span className="flex h-6 items-center justify-center text-white">
              {label}
            </span>
            <span className="flex h-6 items-center justify-center text-[#006dad]">
              {hoverLabel}
            </span>
          </span>
        </span>
        {showChevrons && <ChevronIcon />}
      </span>
    </Link>
  );
}
