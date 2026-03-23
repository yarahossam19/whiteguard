"use client";
import { useEffect, useState } from "react";
import type { ClientLogosData } from "@/data/client-logos";
import type { PartnersLogosData } from "@/data/partners-logos";
import Image from "next/image";

type LogosData = ClientLogosData | PartnersLogosData;

function LogoGrid({ items }: { items: LogosData }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 items-center gap-8">
      {items.map((logo, i) => (
        <div
          key={`${logo.id}-${i}`}
          className="flex items-center justify-center opacity-90 transition hover:opacity-100"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={100}
            className={`w-[${parseInt(logo.width)}px] h-auto max-h-[56px] object-contain`}
          />
        </div>
      ))}
    </div>
  );
}

function getLogosForPage(logos: LogosData, pageIndex: number) {
  const start = (pageIndex * 7) % logos.length;
  return Array.from({ length: 7 }, (_, i) => logos[(start + i) % logos.length]);
}

export default function ClientLogos({
  logos,
  className = "pt-10 lg:pt-40",
}: {
  logos: LogosData;
  className?: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const visible = getLogosForPage(logos, pageIndex);
  const next = getLogosForPage(logos, pageIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);

      setTimeout(() => {
        setPageIndex((p) => (p + 1) % Math.ceil(logos.length / 7));
        setFlip(false);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <div
      className={`w-full bg-white relative z-9 pb-10 px-4 sm:px-6 lg:px-12 ${className}`}
    >
      <div className="mx-auto container px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="perspective-[1000px]">
          <div
            className="relative transform-3d transition-transform duration-300 ease-in-out"
            style={{ transform: flip ? "rotateX(270deg)" : "rotateX(180deg)" }}
          >
            <div className="backface-hidden">
              <LogoGrid items={visible} />
            </div>
            <div className="absolute inset-0 backface-hidden [transform:rotateX(180deg)]">
              <LogoGrid items={next} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
