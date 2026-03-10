"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { partnerLogos } from "@/config/site";

export function PartnersSwiper() {
  return (
    <section className="border-t border-[var(--button-border)] bg-white py-16">
      <div className="mx-auto max-w-[1506px] px-4 sm:px-6 lg:px-[50px]">
        <h2 className="mb-10 text-center text-2xl font-semibold text-[var(--primary-950)]">
          Our Partners
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={48}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          loop
          className="!overflow-visible"
        >
          {partnerLogos.map((partner) => (
            <SwiperSlide key={partner.name}>
              <Link
                href={partner.href}
                className="flex h-12 items-center justify-center grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="object-contain"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
