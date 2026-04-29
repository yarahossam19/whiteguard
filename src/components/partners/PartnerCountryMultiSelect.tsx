"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export const PARTNER_COUNTRY_OPTIONS: { code: string; label: string }[] = [
  { code: "GB", label: "United Kingdom" },
  { code: "AE", label: "United Arab Emirates" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "EG", label: "Egypt" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "BH", label: "Bahrain" },
  { code: "OM", label: "Oman" },
  { code: "JO", label: "Jordan" },
  { code: "LB", label: "Lebanon" },
  { code: "US", label: "United States Of America" },
  { code: "OTHER", label: "Other" },
];

function labelForCode(code: string): string {
  return (
    PARTNER_COUNTRY_OPTIONS.find((o) => o.code === code)?.label ?? code
  );
}

const chipClass =
  "inline-flex items-center gap-1.5 rounded-[999px] bg-[#e8f4fc] py-1.5 pl-3 pr-1 font-jakarta text-[14px] font-medium leading-tight tracking-[0.2px] text-[#003859]";

interface PartnerCountryMultiSelectProps {
  id: string;
  value: string[];
  onChange: (codes: string[]) => void;
  focused: boolean;
  onInteract: () => void;
}

export function PartnerCountryMultiSelect({
  id,
  value,
  onChange,
  focused,
  onInteract,
}: PartnerCountryMultiSelectProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const available = PARTNER_COUNTRY_OPTIONS.filter(
    (o) => !value.includes(o.code),
  );

  useEffect(() => {
    if (available.length === 0) setOpen(false);
  }, [available.length]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const border = focused
    ? "border-[#ABE0FF]"
    : "border-[#e0e6eb]";

  const remove = (code: string) => {
    onChange(value.filter((c) => c !== code));
    onInteract();
  };

  const add = (code: string) => {
    if (!value.includes(code)) {
      onChange([...value, code]);
    }
    setOpen(false);
    onInteract();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        id={id}
        className={`flex min-h-[52px] w-full cursor-default flex-wrap items-center gap-2 rounded-[8px] border-2 bg-white px-3 py-2.5 pr-12 transition-colors duration-200 ${border}`}
        onClick={() => {
          if (available.length === 0) return;
          setOpen((o) => !o);
          onInteract();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        aria-labelledby="countries-label"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
      >
        {value.map((code) => (
          <span
            key={code}
            className={chipClass}
            onClick={(e) => e.stopPropagation()}
          >
            <span>{labelForCode(code)}</span>
            <button
              type="button"
              aria-label={`Remove ${labelForCode(code)}`}
              className="flex size-6 shrink-0 items-center justify-center rounded-full font-ano text-[16px] leading-none text-[#003859] transition-opacity hover:bg-[#d0e8f8]/80 hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                remove(code);
              }}
            >
              ×
            </button>
          </span>
        ))}
        {value.length === 0 ? (
          <span className="select-none px-1 font-jakarta text-[16px] text-[#52697a]">
            Select countries
          </span>
        ) : null}
      </div>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <Image
          src="/images/icons/ChevronDown.svg"
          alt=""
          width={20}
          height={20}
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
          aria-hidden
        />
      </div>

      {open && available.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-56 overflow-y-auto rounded-[8px] border-2 border-[#e0e6eb] bg-white py-1 shadow-[0_8px_24px_rgba(0,56,89,0.1)]"
        >
          {available.map((opt) => (
            <li key={opt.code} role="option">
              <button
                type="button"
                className="w-full px-4 py-2.5 text-left font-jakarta text-[15px] text-[#141a1f] transition-colors hover:bg-[#f0f9ff]"
                onClick={() => add(opt.code)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
