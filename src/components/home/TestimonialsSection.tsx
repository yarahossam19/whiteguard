"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { TestimonialsSectionData } from "@/data/testimonials-section";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { HoverSwapButton } from "../ui/HoverSwapButton";

interface TestimonialsSectionProps {
  data: TestimonialsSectionData;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src="/images/icons/star.svg"
          alt=""
          width={16}
          height={16}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  data,
}: TestimonialsSectionProps) {
  const { heading, subtitle, testimonials, ctaCard } = data;

  return (
    <section
      className="relative w-full overflow-hidden py-24 testimonials-section"
      style={{
        background:
          "linear-gradient(180deg, #f0f9ff 0%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1506px] px-6 lg:px-[7vw]">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <h2 className="font-jakarta text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15]">
            <span className="text-[#003859]">Trusted by </span>
            <span className="text-[#0087D7]">Industry Leaders.</span>
          </h2>
          <p className="max-w-[600px] font-jakarta text-base leading-[1.7] text-[#52697A]">
            {subtitle}
          </p>
        </div>

        {/* Swiper Cards */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={28}
          slidesPerView={1.1}
          loop={false}
          
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          loopPreventsSliding={true}
          loopAdditionalSlides={1}
          navigation
          grabCursor
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 4 },
          }}
          className="!overflow-visible [&_.swiper-button-next]:text-[#003859] [&_.swiper-button-prev]:text-[#003859]"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div
                className="flex min-h-[370px] flex-col rounded-[28px] border p-7"
                style={{
                  borderColor: "#e0f2fe",
                  background: "#fff",
                  boxShadow:
                    "0px 10px 15px rgba(0,56,89,0.05), 0px 4px 6px rgba(0,56,89,0.05)",
                }}
              >
                <Image
                  src="/images/icons/quote.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="mb-4"
                />
                <p className="mb-6 flex-1 font-jakarta text-[15px] leading-[1.75] text-[#003859]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <StarRating count={t.rating} />
                <p className="mt-4 font-jakarta text-[15px] font-bold leading-[1.5] text-[#003859]">
                  {t.name}
                </p>
                <p className="font-jakarta text-[13px] leading-[1.5] text-[#52697A]">
                  {t.title}
                </p>
              </div>
            </SwiperSlide>
          ))}

          {/* CTA Card */}
          <SwiperSlide>
            <div
              className="flex min-h-[370px] w-[340px] max-w-full flex-col justify-between rounded-[28px] border p-7"
              style={{
                borderColor: "#abe0ff",
                background:
                  "linear-gradient(135.75deg, #e8f7ff 75%, #abe0ff 100%)",
                boxShadow:
                  "0px 10px 15px rgba(0,56,89,0.05), 0px 4px 6px rgba(0,56,89,0.05)",
              }}
            >
              <div>
                <span className="text-2xl" aria-hidden>
                  ✨
                </span>
                <h3 className="mt-3 font-jakarta text-xl font-bold leading-[1.5] text-[#006dad]">
                  {ctaCard.title}
                </h3>
                <p className="mt-2 font-jakarta text-sm leading-[1.6] text-[#006dad]/60">
                  {ctaCard.body}
                </p>
              </div>
              <div className="flex justify-start">
                <HoverSwapButton
                  href={ctaCard.buttonHref}
                  label={ctaCard.buttonLabel}
                  hoverLabel={ctaCard.buttonLabel}
                  variant="cta"
                  showChevrons={false}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
