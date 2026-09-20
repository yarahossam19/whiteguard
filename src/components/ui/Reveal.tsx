"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger, in ms. */
  delay?: number;
  /** Travel distance before settling. */
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
  as?: ElementType;
  /** Adds `is-visible` to the element itself - used by .rail to draw a line. */
  variant?: "reveal" | "rail";
}

/**
 * Scroll reveal driven by IntersectionObserver.
 *
 * Children are passed through, so they stay server-rendered: only this wrapper
 * is a client component. The transition itself is CSS (see globals.css), which
 * means prefers-reduced-motion neutralises it without any JS branch.
 *
 * Progressive enhancement: layout.tsx ships a <noscript> rule that forces
 * .reveal visible, so the content is never hidden when JS does not run.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  x,
  scale,
  className,
  as: Tag = "div",
  variant = "reveal",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: Record<string, string> = {};
  if (delay) style["--reveal-delay"] = `${delay}ms`;
  if (y !== undefined) style["--reveal-y"] = `${y}px`;
  if (x !== undefined) style["--reveal-x"] = `${x}px`;
  if (scale !== undefined) style["--reveal-scale"] = String(scale);

  return (
    <Tag
      ref={ref}
      style={style}
      className={[variant, visible ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
