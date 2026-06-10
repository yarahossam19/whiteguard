"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ClientLogosData } from "@/data/client-logos";
import type { PartnersLogosData } from "@/data/partners-logos";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

type LogosData = ClientLogosData | PartnersLogosData;

const FACE_STYLE = {
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
  MozBackfaceVisibility: "hidden" as const,
};

function logosPerPage(isMobile: boolean, isTablet: boolean) {
  if (isMobile) return 2;
  if (isTablet) return 4;
  return 7;
}

function sliceLogosPage(logos: LogosData, pageIndex: number, perPage: number) {
  const start = (pageIndex * perPage) % logos.length;
  return Array.from(
    { length: perPage },
    (_, i) => logos[(start + i) % logos.length],
  );
}

function LogoGrid({ items }: { items: LogosData }) {
  return (
    <div className="grid grid-cols-2 items-center justify-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
      {items.map((logo, i) => (
        <div
          key={`${logo.id}-${i}`}
          className="flex items-center justify-center opacity-90 transition-opacity hover:opacity-100"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={100}
            style={{ width: `${parseInt(logo.width, 10) || 100}px` }}
            className="h-auto max-h-[56px] w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function ClientLogos({
  logos,
  className = "pt-10 ",
}: {
  logos: LogosData;
  className?: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const perPage = logosPerPage(isMobile, isTablet);
  const pageCount = Math.max(1, Math.ceil(logos.length / perPage));

  const visible = useMemo(
    () => sliceLogosPage(logos, pageIndex, perPage),
    [logos, pageIndex, perPage],
  );

  const next = useMemo(
    () => sliceLogosPage(logos, pageIndex + 1, perPage),
    [logos, pageIndex, perPage],
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setFlip(true);
      flipTimeoutRef.current = setTimeout(() => {
        setPageIndex((p) => (p + 1) % pageCount);
        setFlip(false);
        flipTimeoutRef.current = null;
      }, 550);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
        flipTimeoutRef.current = null;
      }
    };
  }, [pageCount, isPaused]);

  const pauseAnimation = () => {
    setIsPaused(true);
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
    setFlip(false);
  };

  return (
    <div className={`relative z-9 w-full bg-white pb-10 ${className}`}>
      <div className="container">
        <div
          className="min-h-[72px] overflow-hidden"
          style={{ perspective: 1000 }}
          onMouseEnter={pauseAnimation}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={pauseAnimation}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >
          <div
            className="relative transition-transform duration-300 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: flip ? "rotateX(270deg)" : "rotateX(180deg)",
            }}
          >
            <div
              style={{
                ...FACE_STYLE,
                transform: "rotateX(180deg)",
              }}
            >
              <LogoGrid items={visible} />
            </div>
            <div
              className="absolute inset-0"
              style={{
                visibility: flip ? "visible" : "hidden",
                ...FACE_STYLE,
                transform: "rotateX(270deg)  ",
                /* Firefox often draws both faces when idle — hide back until flip */
              }}
              aria-hidden={!flip}
            >
              <LogoGrid items={next} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
