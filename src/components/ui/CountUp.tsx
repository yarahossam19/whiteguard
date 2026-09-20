"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Raw display value, e.g. "64+", "99.9%", "24/7", "27". */
  value: string;
  durationMs?: number;
  className?: string;
}

/** Splits "64+" into 64 and "+", or returns null when there is no leading number. */
function parse(value: string): { target: number; decimals: number; suffix: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { target: Number(num), decimals, suffix };
}

/**
 * Counts a metric up once it scrolls into view.
 *
 * Renders the final value on the server and for the whole of the first paint,
 * so the number is never missing or wrong if JS is slow, blocked, or the
 * visitor prefers reduced motion.
 */
export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / durationMs, 1);
            /* easeOutExpo - fast off the mark, long settle. */
            const eased =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = (parsed.target * eased).toFixed(parsed.decimals);
            setDisplay(`${current}${parsed.suffix}`);
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
