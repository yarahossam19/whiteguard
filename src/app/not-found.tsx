import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <MarketingShell>
      <section
        className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:py-28"
        style={{
          background:
            "linear-gradient(180deg, #f0f9ff 0%, rgba(255, 255, 255, 0.5) 50%, #ffffff 100%)",
        }}
        aria-labelledby="not-found-title"
      >
        <p className="font-jakarta text-[clamp(64px,14vw,120px)] font-extrabold leading-none tracking-tight text-[#0087D7]/90">
          404
        </p>
        <h1
          id="not-found-title"
          className="mt-6 font-jakarta text-[clamp(22px,3.5vw,36px)] font-bold leading-tight text-[#003859]"
        >
          Page not found
        </h1>
        <p className="mt-4 max-w-md font-jakarta text-base leading-relaxed text-[#52697A]">
          The link may be broken or the page may have been removed. Try the
          home page or contact us and we will help.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-w-[160px] items-center justify-center rounded-lg bg-[#003859] px-8 py-3 font-ano text-base font-medium text-white transition-colors hover:bg-[#002a42]"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-w-[160px] items-center justify-center rounded-lg border border-[#006dad] bg-white px-8 py-3 font-ano text-base font-medium text-[#006dad] transition-colors hover:bg-[#E7F6FF]"
          >
            Contact us
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
