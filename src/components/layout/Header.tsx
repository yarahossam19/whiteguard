"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink, ExternalArrow, GoArrow } from "@/components/ui/Button";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { mainNav } from "@/config/site";
import { useUIStore } from "@/lib/stores/ui-store";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/* Asymmetric thresholds: the header commits to solid at 24px but only returns
   to its transparent state below 4px. A single threshold flickers when a
   trackpad hovers either side of it mid-transition. */
const SOLIDIFY_AT_PX = 24;
const CLEAR_BELOW_PX = 4;

export function Header() {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const [openDropdown, setOpenDropdown] = useState<{
    label: string;
    path: string;
  } | null>(null);
  /** Which top-level nav item has its mobile submenu open (matched by href). One at a time. */
  const [mobileExpandedHref, setMobileExpandedHref] = useState<string | null>(
    null,
  );
  const [scrolled, setScrolled] = useState(false);
  /** Triggers, so Esc can return focus to the control that opened the panel. */
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* Both derived rather than synchronised in an effect: a panel opened on one
     route is closed by definition once the route changes, and the mobile
     accordion collapses whenever the drawer is shut. */
  const activeDropdown =
    openDropdown && openDropdown.path === pathname ? openDropdown.label : null;
  const expandedHref = isMobileMenuOpen ? mobileExpandedHref : null;

  const openPanel = (label: string) =>
    setOpenDropdown({ label, path: pathname });

  /* The home hero pulls itself up by --header-h, so the header genuinely sits
     over the hero rather than stacking a flat navy bar above it. That lets the
     header go fully transparent at rest - the hero gradient and glow run
     unbroken behind it - and flip to the solid light bar once scrolled. Every
     other route is light, so it starts solid. */
  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !isMobileMenuOpen;

  useEffect(() => {
    const onScroll = () =>
      setScrolled((prev) => {
        const y = window.scrollY;
        return prev ? y > CLEAR_BELOW_PX : y > SOLIDIFY_AT_PX;
      });
    /* Sync the initial value on the next frame rather than synchronously in
       the effect body, so a restored scroll position renders correctly. */
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Esc closes the open panel and restores focus to its trigger (WF-028). */
  useEffect(() => {
    if (!activeDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenDropdown(null);
      triggerRefs.current[activeDropdown]?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeDropdown]);

  /* Esc also closes the mobile overlay, and the page behind it must not scroll. */
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  const navLinkClass = (href: string) =>
    [
      "nav-pill nav-fade inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap",
      "rounded-full px-3 py-2 text-[14px] font-semibold 2xl:text-[15px]",
      overlay
        ? pathname === href
          ? "text-white"
          : "text-white/80 hover:text-white"
        : pathname === href
          ? "text-accent-600"
          : "text-ink hover:text-accent-600",
    ].join(" ");

  return (
    <>
      {/* Two details make this fade cleanly rather than flash:
          - the transparent state is bg-white/0, not bg-transparent. sRGB
            interpolates transparent-black -> white/90 through grey, so a
            `transparent` start visibly darkens mid-fade. Matching the hue and
            moving only alpha keeps it white the whole way.
          - backdrop-blur is always on. backdrop-filter cannot interpolate from
            `none`, so toggling it made the blur snap in one frame while the
            background was still fading. At rest only the hero's ambient
            gradient sits behind the bar, so a constant blur is invisible. */}
      <header
        className={[
          "nav-fade sticky top-0 z-50 w-full border-b backdrop-blur-xl",
          overlay
            ? "border-white/0 bg-white/0 shadow-none"
            : "border-line bg-white/90 shadow-[0_6px_24px_-18px_rgba(11,42,91,0.5)]",
        ].join(" ")}
      >
        {/* .container, not .container-fluid: every section below uses .container,
            so a full-bleed header left the logo ~75px outside the content column
            and ran the CTA into the viewport edge. */}
        <nav
          className="container flex h-[var(--header-h)] min-w-0 items-center justify-between gap-2 lg:gap-4"
          aria-label="Main navigation"
        >
          <Logo variant={overlay ? "light" : "default"} />

          {/* Desktop navigation */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex 2xl:gap-2">
            {mainNav.map((item) => {
              const hasDropdown =
                "hasDropdown" in item && item.hasDropdown && "subLinks" in item;
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative shrink-0"
                  onMouseEnter={() =>
                    hasDropdown ? openPanel(item.label) : undefined
                  }
                  onMouseLeave={() =>
                    hasDropdown ? setOpenDropdown(null) : undefined
                  }
                >
                  <Link
                    href={item.href}
                    ref={(node) => {
                      triggerRefs.current[item.label] = node;
                    }}
                    className={navLinkClass(item.href)}
                    data-active={pathname === item.href ? "true" : undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onKeyDown={(event) => {
                      /* Enter/Space opens the panel rather than navigating, so
                         the menu is reachable without a pointer (WF-028). */
                      if (!hasDropdown) return;
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        if (isOpen) setOpenDropdown(null);
                        else openPanel(item.label);
                      }
                    }}
                  >
                    {item.label}
                    {hasDropdown && (
                      <Chevron
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {hasDropdown && isOpen && (
                    <ServicesDropdown
                      small={"small" in item ? item.small : undefined}
                      items={item.subLinks.map((s) => ({
                        label: s.label,
                        description:
                          "description" in s ? s.description : undefined,
                        href: s.href,
                        icon: "icon" in s ? s.icon : undefined,
                      }))}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <ButtonLink
              href="https://whitehawk.io"
              target="_blank"
              rel="noopener noreferrer"
              variant={overlay ? "ghost-ondark" : "ghost"}
              size="sm"
              className="nav-fade"
            >
              White Hawk
              <ExternalArrow />
            </ButtonLink>
            {/* One accent button per viewport: on the home page the hero owns
                it, so the header CTA steps down to a secondary treatment. */}
            <ButtonLink
              href="/contact"
              variant={
                isHome ? (overlay ? "solid-ondark" : "ghost") : "accent"
              }
              size="sm"
              className="nav-fade"
            >
              Book a Consultation
              <GoArrow />
            </ButtonLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={[
              "nav-fade inline-flex size-11 shrink-0 items-center justify-center rounded-full border lg:hidden",
              overlay
                ? "border-white/30 bg-white/5 text-white"
                : "border-line bg-white text-ink",
            ].join(" ")}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile overlay - full screen, so 27 services stay two taps away */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <span className="orb left-[-20%] top-[-10%] h-[320px] w-[320px] bg-accent/30" />
            <span
              className="orb right-[-18%] bottom-[-8%] h-[280px] w-[280px] bg-[#38BDF8]/20"
              style={{ animationDelay: "-7s" }}
            />
          </div>

          <div className="container relative z-10 flex h-[var(--header-h)] items-center justify-between">
            <Logo variant="light" />
            <button
              type="button"
              onClick={closeMobileMenu}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white"
              aria-label="Close menu"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="container relative z-10 flex flex-1 flex-col pb-8">
            <nav aria-label="Mobile navigation" className="mt-4 flex flex-col">
              {mainNav.map((item, index) => {
                const hasSubLinks =
                  "subLinks" in item &&
                  item.subLinks &&
                  item.subLinks.length > 0;
                const isThisExpanded = expandedHref === item.href;

                return (
                  <div
                    key={`${item.label}-${item.href}`}
                    className="rise border-b border-white/10"
                    style={
                      { "--rise-delay": `${index * 55}ms` } as CSSProperties
                    }
                  >
                    <div className="flex items-stretch">
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex min-h-[60px] min-w-0 flex-1 items-center text-[22px] font-extrabold tracking-[-0.02em] transition-colors ${
                          pathname === item.href
                            ? "text-[#9bc4ff]"
                            : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {hasSubLinks && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedHref((prev) =>
                              prev === item.href ? null : item.href,
                            )
                          }
                          className="flex min-h-[60px] w-12 shrink-0 items-center justify-center text-white/70"
                          aria-expanded={isThisExpanded}
                          aria-label={
                            isThisExpanded
                              ? `Hide ${item.label} submenu`
                              : `Show ${item.label} submenu`
                          }
                        >
                          <Chevron
                            className={`h-6 w-6 transition-transform duration-200 ${
                              isThisExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasSubLinks && isThisExpanded && (
                      <div className="flex flex-col pb-3">
                        {item.subLinks?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={closeMobileMenu}
                            className={`flex min-h-[48px] items-center gap-2 pl-4 text-[15px] font-semibold transition-colors ${
                              pathname === sub.href
                                ? "text-[#9bc4ff]"
                                : "text-[#9bb4e6] hover:text-white"
                            }`}
                          >
                            <span
                              aria-hidden
                              className="h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <ButtonLink
                href="/contact"
                onClick={closeMobileMenu}
                variant="accent"
                size="lg"
                className="w-full"
              >
                Book a Consultation
                <GoArrow />
              </ButtonLink>
              <ButtonLink
                href="https://whitehawk.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                variant="ghost-ondark"
                size="lg"
                className="w-full"
              >
                White Hawk
                <ExternalArrow />
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
