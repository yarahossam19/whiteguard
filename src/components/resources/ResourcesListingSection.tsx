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
      {/* Section heading - pixel-perfect from Figma */}
      <div className="mx-auto flex  flex-col items-center gap-0 px-4 pt-0 text-center sm:px-6 lg:px-[96px]">
        <h2 className="font-jakarta text-[24px] font-bold leading-[36px] text-[#003859] lg:text-[30px]">
          {listing.heading}
        </h2>
        <p className="mt-4 max-w-[738px] font-jakarta text-[16px] font-normal leading-[24px] text-[#52697A]">
          {listing.subtitle}
        </p>
      </div>

      {/* Cards grid - 3 columns, gap 50px rows, 49px between grid and pagination */}
      <div className="mx-auto mt-[49px] flex max-w-[1313px] flex-col items-center gap-[49px] px-4 sm:px-6 lg:px-[96px]">
        <div className="grid w-full grid-cols-1 gap-y-[50px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[57px] lg:gap-y-[50px]">
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
    </section>
  );
}
