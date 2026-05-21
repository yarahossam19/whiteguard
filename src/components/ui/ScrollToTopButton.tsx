"use client";

import { useCallback, useEffect, useState } from "react";

/** Show the button after the user has scrolled this far down. */
const SHOW_AFTER_PX = 400;

/**
 * Fixed “back to top” control — brand colors, smooth scroll, appears after scroll.
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const update = useCallback(() => {
    setVisible(window.scrollY > SHOW_AFTER_PX);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`font-ano fixed bottom-6 right-6 z-[100] flex size-12 items-center justify-center rounded-full border-[#003859] border text-[#003859] shadow-[0_8px_28px_rgba(0,56,89,0.28)] transition-all duration-300 ease-out hover:bg-[#002439] hover:text-white hover:shadow-[0_10px_32px_rgba(0,36,57,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0087d7] md:bottom-8 md:right-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      } `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
