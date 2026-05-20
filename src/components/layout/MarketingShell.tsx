import { Suspense, type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Logo } from "@/components/ui/Logo";

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-[12px] bg-white/95 supports-[backdrop-filter]:bg-white/90">
      <nav
        className="container-fluid flex items-center justify-between gap-4 py-6 lg:py-6"
        aria-label="Main navigation"
      >
        <Logo />
      </nav>
    </header>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
