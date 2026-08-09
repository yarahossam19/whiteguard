"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import ResourceCard from "./ResourceCard";
import type { ResourceCardItem } from "./ResourceCard";

interface ResourceDetailRelatedProps {
  items: ResourceCardItem[];
}

export default function ResourceDetailRelated({
  items,
}: ResourceDetailRelatedProps) {
  if (items.length === 0) return null;

  return (
    <section className="w-full overflow-hidden py-16">
      <div className="container">
        <div className="mb-5 flex flex-col items-start gap-4">
          <h2 className="font-jakarta border-b-4 border-[#29343D] pb-3 text-[32px] font-normal capitalize leading-normal tracking-[-0.8px] text-[#29343D]">
            Related Blogs
          </h2>
        </div>

        <Swiper
          modules={[Pagination]}
          slidesPerView={1.2}
          spaceBetween={10}
          pagination={{ clickable: true }}
          grabCursor
          watchOverflow
          breakpoints={{
            375: { slidesPerView: 1.2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 94 },
          }}
          className="resource-related-swiper !pb-2 [&_.swiper-pagination]:!static [&_.swiper-pagination]:mt-10 [&_.swiper-pagination]:flex [&_.swiper-pagination]:w-full [&_.swiper-pagination]:items-center [&_.swiper-pagination]:justify-center [&_.swiper-pagination-bullet]:!mx-1.5 [&_.swiper-pagination-bullet]:!h-2.5 [&_.swiper-pagination-bullet]:!w-2.5 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!bg-[#c2cdd6] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!w-7 [&_.swiper-pagination-bullet-active]:!bg-[#003859] [&_.swiper-pagination-bullet-active]:!rounded-full"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="!flex !h-auto !self-stretch">
              <div className="flex h-full min-h-0 w-full lg:max-w-[375px]">
                <ResourceCard item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
