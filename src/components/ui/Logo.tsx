import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  /** `light` is for dark grounds (the navy footer, and the header over the hero). */
  variant?: "default" | "light";
}

/**
 * Both marks are always rendered and cross-faded by opacity.
 *
 * Swapping the `src` when the header goes from its transparent state to the
 * solid one was a hard image swap: the browser had to fetch and decode the
 * other file mid-transition, so the logo blinked while everything around it
 * faded. Two stacked SVGs cost nothing and the change becomes part of the same
 * cross-fade as the background.
 *
 * The link carries the accessible name, so both images are decorative.
 */
export function Logo({ variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className="relative block h-11 w-[76px] shrink-0"
      aria-label="WhiteGuard - Home"
    >
      <Image
        src="/images/logo-icon.svg"
        alt=""
        width={76}
        height={46}
        fetchPriority="high"
        aria-hidden
        className={`nav-fade absolute inset-0 h-11 w-[76px] object-contain ${
          isLight ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src="/images/logo-white.svg"
        alt=""
        width={76}
        height={46}
        fetchPriority="high"
        aria-hidden
        className={`nav-fade absolute inset-0 h-11 w-[76px] object-contain ${
          isLight ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}
