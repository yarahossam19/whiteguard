"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ServicesDropdownItem {
  label: string;
  description?: string;
  href: string;
  icon?: string;
  small?: boolean;
}

interface ServicesDropdownProps {
  items: readonly ServicesDropdownItem[];
  small?: boolean;
}

/** Dropdown panel for the header. Open/close and focus restoration live in Header. */
export function ServicesDropdown({ items }: ServicesDropdownProps) {
  const pathname = usePathname();

  return (
    <div className="absolute left-0 top-full pt-2" role="group">
      <div className="flex w-[380px] flex-col rounded-[var(--r-md)] border border-line bg-white p-2 shadow-[0_18px_40px_rgba(11,42,91,0.12)]">
        {items.map((sub) => {
          const isActive = pathname === sub.href;

          return (
            <Link
              key={sub.href}
              href={sub.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-start gap-3 rounded-[var(--r-sm)] p-3 transition-colors duration-150 ${
                isActive ? "bg-accent-100" : "hover:bg-wash"
              }`}
            >
              {sub.icon && (
                <span className="relative size-10 shrink-0 overflow-hidden rounded-[var(--r-sm)]">
                  <Image
                    src={sub.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-cover"
                    aria-hidden
                  />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-[14px] font-extrabold leading-tight ${
                    isActive ? "text-accent-600" : "text-navy"
                  }`}
                >
                  {sub.label}
                </span>
                {sub.description && (
                  <span className="mt-1 block text-[12px] leading-[1.45] text-slate">
                    {sub.description}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
