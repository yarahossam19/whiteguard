"use client";

import { useState } from "react";
import ResourceCard from "./ResourceCard";
import ResourcesPagination from "./ResourcesPagination";
import type { ResourcesData } from "@/data/resources";

interface ResourcesListingSectionProps {
  data: ResourcesData;
}

export default function ResourcesListingSection({
  data,
}: ResourcesListingSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { listing, items } = data;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="w-full bg-white">
      <div className="container flex flex-col items-center gap-[49px] pt-0">
      {/* Section heading */}
      <div className="flex flex-col items-center gap-0 text-center">
        <h2 className="font-jakarta text-[24px] font-bold leading-[36px] text-[#003859] lg:text-[30px]">
          {listing.heading}
        </h2>
        <p className="mt-4 max-w-[738px] font-jakarta text-[16px] font-normal leading-[24px] text-[#52697A]">
          {listing.subtitle}
        </p>
      </div>

      {/* Cards grid - 3 columns, and pagination */}
      <div className="flex w-full flex-col items-center gap-[49px]">
        <div className="grid w-full grid-cols-1 gap-y-[50px]  md:grid-cols-2 md:gap-x-[35px] xl:grid-cols-3 xl:gap-x-[57px] lg:gap-y-[50px]">
          {visibleItems.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <ResourcesPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>
      </div>
    </section>
  );
}
