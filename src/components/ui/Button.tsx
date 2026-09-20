import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Button, per Whitehawk_Design_System.html.
 *
 * Geometry and scale come straight from that doc: 6px radius (--r-sm), a 1px
 * border on every variant so the box never shifts between them, 600 weight,
 * and the three padding steps (7/14 * 13px, 11/20 * 14px, 14/26 * 15px). Fills
 * are flat - no gradient, no glow, no lift - so the accent reads as a single
 * solid colour the way the doc specifies.
 *
 * Only one filled style exists. The design system lists a navy `btn-primary`
 * as well, but wireframes v2 retired it (WF-018) so a second navy primary
 * cannot creep back in; accent is the primary everywhere.
 *
 *   accent        the single filled action - one per viewport
 *   ghost         secondary on light backgrounds
 *   ghost-ondark  secondary on the navy sections
 *   solid-ondark  white fill on navy, for a lead action where accent is spent
 *   link          inline text action, no box
 *
 * Kept separate from HoverSwapButton, which is still used by every page running
 * the previous palette.
 */
export type ButtonVariant =
  | "accent"
  | "ghost"
  | "ghost-ondark"
  | "solid-ondark"
  | "link";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  accent: "border-transparent bg-accent text-white hover:bg-accent-600",
  ghost: "border-line bg-white text-ink hover:border-slate",
  /* bg-white/0 rather than bg-transparent: visually identical, but when the
     header swaps this variant for `ghost` the fill interpolates white->white on
     alpha alone instead of passing through grey. */
  "ghost-ondark":
    "border-white/30 bg-white/0 text-white hover:border-white/70",
  "solid-ondark": "border-transparent bg-white text-navy hover:bg-[#EEF3FB]",
  link: "border-transparent bg-transparent text-accent hover:underline",
};

/** Padding scale from the design system. `link` overrides the horizontal step. */
const SIZES: Record<ButtonSize, string> = {
  sm: "px-[14px] py-[7px] text-[13px]",
  md: "px-5 py-[11px] text-[14px]",
  lg: "px-[26px] py-[14px] text-[15px]",
};

const LINK_SIZES: Record<ButtonSize, string> = {
  sm: "px-1 py-[7px] text-[13px]",
  md: "px-1 py-[11px] text-[14px]",
  lg: "px-1 py-[14px] text-[15px]",
};

/**
 * 44px minimum target (WF-027). The design system's own padding lands at ~42px
 * on the default size, so this only tops it up - it does not change the look.
 */
const BASE = [
  "inline-flex min-h-[44px] items-center justify-center gap-2",
  "rounded-[var(--r-sm)] border font-semibold whitespace-nowrap",
  "transition-[background-color,border-color,color] duration-150 ease-out",
  "disabled:pointer-events-none disabled:opacity-45",
].join(" ");

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  const sizing = variant === "link" ? LINK_SIZES[size] : SIZES[size];
  return [BASE, VARIANTS[variant], sizing, className].filter(Boolean).join(" ");
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({
  variant = "accent",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={`group ${classes(variant, size, className)}`} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  variant = "accent",
  size = "md",
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`group ${classes(variant, size, className)}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Marks a destination that leaves the site (WF-034). */
export function ExternalArrow() {
  return (
    <span
      aria-hidden
      className="text-[0.85em] leading-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      &#8599;
    </span>
  );
}

/** Trailing arrow that slides on hover. Pairs with any variant. */
export function GoArrow() {
  return (
    <span
      aria-hidden
      className="leading-none transition-transform duration-300 group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );
}
