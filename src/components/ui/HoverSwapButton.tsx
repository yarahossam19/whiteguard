"use client";

import Image from "next/image";
import Link from "next/link";

interface HoverSwapButtonBaseProps {
  label: string;
  hoverLabel: string;
  showChevrons?: boolean;
  showArrow?: boolean;
  variant?: "nav" | "cta" | "secondary";
  className?: string;
  showImg?: boolean;
  imgSrc?: string;
}

interface HoverSwapButtonLinkProps extends HoverSwapButtonBaseProps {
  as?: "link";
  href: string;
}

interface HoverSwapButtonSubmitProps extends HoverSwapButtonBaseProps {
  as: "button";
  type?: "submit" | "button";
  disabled?: boolean;
}

type HoverSwapButtonProps =
  | HoverSwapButtonLinkProps
  | HoverSwapButtonSubmitProps;

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

function ArrowDownIcon() {
  return (
    <Image
      src="/images/icons/arrow-down.svg"
      alt=""
      width={20}
      height={20}
      className="shrink-0"
      aria-hidden
    />
  );
}

/**
 * Button with hover text swap.
 * cta (dark): gradient + glow. secondary (light): white bg + blue border.
 */
export function HoverSwapButton(props: HoverSwapButtonProps) {
  const {
    label,
    hoverLabel,
    showChevrons = true,
    showArrow = false,
    variant = "nav",
    showImg = false,
    imgSrc = "/images/icons/download.svg",
    className = "",
  } = props;
  const as = "as" in props ? props.as : "link";
  const href = "href" in props ? props.href : undefined;
  const type = "type" in props ? props.type : "submit";
  const disabled = "disabled" in props ? props.disabled : false;

  const isNav = variant === "nav";
  const isSecondary = variant === "secondary";
  const isButton = as === "button";

  const primaryButtonContent = (
    <>
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
      <div className="relative z-10 flex items-center gap-2">
        {showChevrons && <ChevronIcon />}
        {showImg && (
          <Image
            src={imgSrc}
            alt=""
            width={20}
            height={20}
            className="shrink-0 brightness-0 invert"
          />
        )}
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
      </div>
    </>
  );

  if (isButton) {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`group relative inline-flex w-full items-center justify-center gap-2 rounded-[12px] font-ano font-normal duration-300 ease-out px-3 lg:px-6 py-3 text-[clamp(14px,1.1vw,24px)] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      >
        {primaryButtonContent}
      </button>
    );
  }

  if (isSecondary) {
    return (
      <Link
        href={href ?? "#"}
        className="group w-full md:w-auto inline-flex rounded-lg p-[2px] font-ano font-normal text-[#002439] text-[clamp(14px,1.1vw,24px)]"
        style={{
          background: "linear-gradient(180deg, #0087D7 0%, #81D0FF 100%)",
        }}
      >
        <div
          className={`flex items-center justify-center gap-2 rounded-[5px] bg-white px-2 lg:px-4 py-2 text-sm lg:text-[clamp(14px,1.1vw,24px)] transition-colors duration-300 ease-out group-hover:bg-[#ABE0FF]/30 ${className}`}
        >
          {showChevrons && !showArrow && <ChevronIcon />}
          {showImg && (
            <Image
              src={imgSrc}
              alt={label}
              width={20}
              height={20}
              className="shrink-0"
            />
          )}
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
          {showArrow ? <ArrowDownIcon /> : showChevrons && <ChevronIcon />}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href ?? "#"}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-[12px] font-ano font-normal duration-300 ease-out ${
        isNav
          ? "px-4 py-2.5 text-[clamp(14px,1.1vw,24px)]"
          : "px-6 py-3 text-[clamp(14px,1.1vw,24px)]"
      } ${className}`}
    >
      {primaryButtonContent}
    </Link>
  );
}
