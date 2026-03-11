"use client";
import { useEffect, useState } from "react";

const logos = [
  {
    id: 1,
    alt: "A.T. Lease",
    src: "/images/clients/partner-1.png",
    width: "w-12",
  },
  {
    id: 2,
    alt: "EDRAKY Technology & Beyond",
    src: "/images/clients/partner-2.png",
    width: "w-32",
  },
  {
    id: 3,
    alt: "Client Logo",
    src: "/images/clients/partner-3.png",
    width: "w-12",
  },
  {
    id: 4,
    alt: "TAMAA Finance Company",
    src: "/images/clients/partner-4.png",
    width: "w-36",
  },
  { id: 5, alt: "MDP", src: "/images/clients/partner-5.png", width: "w-20" },
  {
    id: 6,
    alt: "ORASCOM",
    src: "/images/clients/partner-6.png",
    width: "w-40",
  },
  {
    id: 7,
    alt: "Jockey Club of Saudi Arabia",
    src: "/images/clients/partner-7.png",
    width: "w-44",
  },
  {
    id: 8,
    alt: "Client Logo",
    src: "/images/clients/partner-8.png",
    width: "w-24",
  },
  {
    id: 9,
    alt: "Client Logo",
    src: "/images/clients/partner-9.png",
    width: "w-24",
  },
  {
    id: 10,
    alt: "Client Logo",
    src: "/images/clients/partner-10.png",
    width: "w-24",
  },
  {
    id: 11,
    alt: "Client Logo",
    src: "/images/clients/partner-11.png",
    width: "w-24",
  },
  {
    id: 12,
    alt: "Client Logo",
    src: "/images/clients/partner-12.png",
    width: "w-24",
  },
  {
    id: 13,
    alt: "Client Logo",
    src: "/images/clients/partner-13.png",
    width: "w-24",
  },
  {
    id: 14,
    alt: "Client Logo",
    src: "/images/clients/partner-14.png",
    width: "w-24",
  },
  {
    id: 15,
    alt: "Client Logo",
    src: "/images/clients/partner-15.png",
    width: "w-24",
  },
  {
    id: 16,
    alt: "Client Logo",
    src: "/images/clients/partner-16.png",
    width: "w-24",
  },
  {
    id: 17,
    alt: "Client Logo",
    src: "/images/clients/partner-17.png",
    width: "w-24",
  },
  {
    id: 18,
    alt: "Client Logo",
    src: "/images/clients/partner-18.png",
    width: "w-24",
  },
  {
    id: 19,
    alt: "Client Logo",
    src: "/images/clients/partner-19.png",
    width: "w-24",
  },
  {
    id: 20,
    alt: "Client Logo",
    src: "/images/clients/partner-20.png",
    width: "w-24",
  },
  {
    id: 21,
    alt: "Client Logo",
    src: "/images/clients/partner-21.png",
    width: "w-24",
  },
  {
    id: 22,
    alt: "Client Logo",
    src: "/images/clients/partner-22.png",
    width: "w-24",
  },
  {
    id: 23,
    alt: "Client Logo",
    src: "/images/clients/partner-23.png",
    width: "w-24",
  },
  {
    id: 24,
    alt: "Client Logo",
    src: "/images/clients/partner-24.png",
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
    <div className="w-full bg-white relative z-9 pt-10 lg:pt-40 pb-10 px-8 lg:px-12">
      <div className="mx-auto container px-24">
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
