import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

/**
 * Header is rendered directly rather than behind a Suspense boundary.
 *
 * The boundary used to flush a logo-only fallback into the prerendered HTML,
 * so every page painted a plain white bar before hydration swapped in the real
 * nav. That was merely untidy while the header was always white; now that the
 * home header is transparent over a navy hero it would flash a white bar on
 * first paint. Nothing in the header tree actually suspends - no
 * useSearchParams, and usePathname resolves at build time for these routes -
 * so the boundary bought nothing.
 */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
