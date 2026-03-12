"use client";

interface ResourcesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function ResourcesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ResourcesPaginationProps) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            className={`flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-[8px] font-jakarta text-[20px] font-bold leading-[24px] tracking-[0px] transition-colors ${
              isActive
                ? "bg-[var(--primary-950,#002439)] text-white"
                : "bg-white text-[#52697A] hover:bg-gray-50"
            }`}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
