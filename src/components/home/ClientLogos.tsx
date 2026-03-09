"use client";

import { useEffect, useState } from "react";

const logos = [
  {
    id: 1,
    alt: "A.T. Lease",
    src: "/images/partners/partner-1.png",
    width: "w-12",
  },
  {
    id: 2,
    alt: "EDRAKY Technology & Beyond",
    src: "/images/partners/partner-2.png",
    width: "w-32",
  },
  {
    id: 3,
    alt: "Client Logo",
    src: "/images/partners/partner-3.png",
    width: "w-12",
  },
  {
    id: 4,
    alt: "TAMAA Finance Company",
    src: "/images/partners/partner-4.png",
    width: "w-36",
  },
  { id: 5, alt: "MDP", src: "/images/partners/partner-5.png", width: "w-20" },
  {
    id: 6,
    alt: "ORASCOM",
    src: "/images/partners/partner-6.png",
    width: "w-40",
  },
  {
    id: 7,
    alt: "Jockey Club of Saudi Arabia",
    src: "/images/partners/partner-7.png",
    width: "w-44",
  },
  {
    id: 8,
    alt: "Partner 8",
    src: "/images/partners/partner-8.png",
    width: "w-24",
  },
  {
    id: 9,
    alt: "Partner 9",
    src: "/images/partners/partner-9.png",
    width: "w-24",
  },
  {
    id: 10,
    alt: "Partner 10",
    src: "/images/partners/partner-10.png",
    width: "w-24",
  },
  {
    id: 11,
    alt: "Partner 11",
    src: "/images/partners/partner-11.png",
    width: "w-24",
  },
  {
    id: 12,
    alt: "Partner 12",
    src: "/images/partners/partner-12.png",
    width: "w-24",
  },
  {
    id: 13,
    alt: "Partner 13",
    src: "/images/partners/partner-13.png",
    width: "w-24",
  },
  {
    id: 14,
    alt: "Partner 14",
    src: "/images/partners/partner-14.png",
    width: "w-24",
  },
  {
    id: 15,
    alt: "Partner 15",
    src: "/images/partners/partner-15.png",
    width: "w-24",
  },
  {
    id: 16,
    alt: "Partner 16",
    src: "/images/partners/partner-16.png",
    width: "w-24",
  },
  {
    id: 17,
    alt: "Partner 17",
    src: "/images/partners/partner-17.png",
    width: "w-24",
  },
  {
    id: 18,
    alt: "Partner 18",
    src: "/images/partners/partner-18.png",
    width: "w-24",
  },
  {
    id: 19,
    alt: "Partner 19",
    src: "/images/partners/partner-19.png",
    width: "w-24",
  },
  {
    id: 20,
    alt: "Partner 20",
    src: "/images/partners/partner-20.png",
    width: "w-24",
  },
  {
    id: 21,
    alt: "Partner 21",
    src: "/images/partners/partner-21.png",
    width: "w-24",
  },
  {
    id: 22,
    alt: "Partner 22",
    src: "/images/partners/partner-22.png",
    width: "w-24",
  },
  {
    id: 23,
    alt: "Partner 23",
    src: "/images/partners/partner-23.png",
    width: "w-24",
  },
  {
    id: 24,
    alt: "Partner 24",
    src: "/images/partners/partner-24.png",
    width: "w-24",
  },
  {
    id: 25,
    alt: "Partner 25",
    src: "/images/partners/partner-25.png",
    width: "w-24",
  },
  {
    id: 26,
    alt: "Partner 26",
    src: "/images/partners/partner-26.png",
    width: "w-24",
  },
  {
    id: 27,
    alt: "Partner 27",
    src: "/images/partners/partner-27.png",
    width: "w-24",
  },
  {
    id: 28,
    alt: "Partner 28",
    src: "/images/partners/partner-28.png",
    width: "w-24",
  },
  {
    id: 29,
    alt: "Partner 29",
    src: "/images/partners/partner-29.png",
    width: "w-24",
  },
  {
    id: 30,
    alt: "Partner 30",
    src: "/images/partners/partner-30.png",
    width: "w-24",
  },
  {
    id: 31,
    alt: "Partner 31",
    src: "/images/partners/partner-31.png",
    width: "w-24",
  },
  {
    id: 32,
    alt: "Partner 32",
    src: "/images/partners/partner-32.png",
    width: "w-24",
  },
  {
    id: 33,
    alt: "Partner 33",
    src: "/images/partners/partner-33.png",
    width: "w-24",
  },
  {
    id: 34,
    alt: "Partner 34",
    src: "/images/partners/partner-34.png",
    width: "w-24",
  },
  {
    id: 35,
    alt: "Partner 35",
    src: "/images/partners/partner-35.png",
    width: "w-24",
  },
];

function LogoGrid({ items }: { items: typeof logos }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 items-center gap-8">
      {items.map((logo, i) => (
        <div
          key={`${logo.id}-${i}`}
          className="flex items-center justify-center opacity-90 transition hover:opacity-100"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className={`${logo.width} h-auto max-h-[56px] object-contain`}
          />
        </div>
      ))}
    </div>
  );
}

function getLogosForPage(pageIndex: number) {
  const start = (pageIndex * 7) % logos.length;
  return Array.from({ length: 7 }, (_, i) => logos[(start + i) % logos.length]);
}

export default function ClientLogos() {
  const [pageIndex, setPageIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const visible = getLogosForPage(pageIndex);
  const next = getLogosForPage(pageIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);

      setTimeout(() => {
        setPageIndex((p) => (p + 1) % Math.ceil(logos.length / 7));
        setFlip(false);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white py-10 lg:pt-40 pb-10 px-6 lg:px-12">
      <div className="mx-auto container px-20">
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
