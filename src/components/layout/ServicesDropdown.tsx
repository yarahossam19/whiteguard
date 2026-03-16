"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export interface ServicesDropdownItem {
  label: string;
  description?: string;
  href: string;
  icon?: string;
}

interface ServicesDropdownProps {
  items: readonly ServicesDropdownItem[];
}

export function ServicesDropdown({ items }: ServicesDropdownProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [isHovered, setIsHovered] = useState(true);

  return (
    <div
      className={`absolute left-0 top-full pt-1 ${isHovered ? "block" : "hidden"}`}
      role="menu"
      aria-label="Services menu"
      onClick={() => setIsHovered(false)}
    >
      <div
        className="flex flex-col gap-10 rounded-2xl border-4 border-[#e7f6ff] bg-white px-6 py-8 shadow-[0px_3.5px_4.3px_2px_rgba(0,0,0,0.25)]"
        style={{
          minWidth: "402px",
          backgroundImage: "url('/images/logo-icon-2.svg')",
          backgroundSize: "95% 95%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backdropFilter: "invert(1)",
          // backgroundBlendMode: "overlay",
        }}
      >
        {items.map((sub) => {
          const subTab = sub.href.includes("tab=")
            ? sub.href.split("tab=")[1]
            : null;
          const isActive =
            pathname === "/services" && subTab && tabParam === subTab;

          return (
            <Link
              key={sub.href}
              href={sub.href}
              role="menuitem"
              className="group flex flex-col gap-2"
            >
              <div className="flex items-start gap-[9px]">
                {sub.icon && (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={sub.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-jakarta text-base font-semibold leading-[1.2] text-[#003859]">
                    {sub.label}
                  </p>
                  {"description" in sub && sub.description && (
                    <p className="font-jakarta text-sm font-normal leading-[1.2] text-[#52697a]">
                      {sub.description}
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`h-0.5 rounded-sm transition-all duration-200 ${
                  isActive
                    ? "w-full bg-[#005283]"
                    : "w-0 bg-transparent group-hover:w-full group-hover:bg-[#005283]"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
