"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { mainNav } from "@/config/site";
import { useUIStore } from "@/lib/stores/ui-store";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) setMobileServicesOpen(false);
  }, [isMobileMenuOpen]);

  /* Hover: bg Primary-100 | Selected: bg Primary-200 | border-radius: 8px */
  const navLinkClass = (href: string) =>
    `inline-flex items-center gap-2 rounded-lg px-4 py-1 text-[20px]  leading-6 font-normal font-ano duration-300 ease-out transition-[background-color] ${
      pathname === href
        ? "text-[var(--primary-950)] bg-[var(--Primary-200)]"
        : "text-[var(--primary-950)] hover:bg-[#ABE0FF]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full  py-6 xl:py-6 backdrop-blur-md bg-white/95 supports-backdrop-filter:bg-white/90">
      <nav
        className="container-fluid flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 xl:flex">
          {mainNav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() =>
                "hasDropdown" in item && item.hasDropdown
                  ? setOpenDropdown(item.label)
                  : null
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {"hoverLabel" in item && item.hoverLabel ? (
                <HoverSwapButton
                  href={item.href}
                  label={item.label}
                  hoverLabel={String(item.hoverLabel)}
                  variant="nav"
                />
              ) : (
                <Link href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                  {"hasDropdown" in item && item.hasDropdown && (
                    <Image
                      src="/images/icons/arrow-bottom.png"
                      alt=""
                      width={24}
                      height={24}
                      className={`shrink-0 transition-[transform_var(--transition-dissolve)] ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  )}
                </Link>
              )}

              {/* Services Dropdown */}
              {"hasDropdown" in item &&
                item.subLinks &&
                openDropdown === item.label && (
                  <ServicesDropdown
                    small={item.small}
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
          ))}
        </div>

        <div className="hidden xl:flex   items-center gap-8">
          <HoverSwapButton
            href="https://www.whitehwk.com"
            label="White Hawk"
            hoverLabel="White Hawk"
            variant="secondary"
            showChevrons={false}
            showImg={true}
            imgSrc="/images/icons/external-link.svg"
            className="text-sm md:text-base xl:text-lg flex flex-row-reverse items-center gap-2  font-ano"
          />
          <HoverSwapButton
            href="/contact"
            label="Book a Consultation"
            hoverLabel="Book a Consultation"
            variant="cta"
            showChevrons={false}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--primary-950)] duration-300 ease-out transition-[background-color] hover:bg-[#ABE0FF] xl:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-[var(--button-border)] bg-white xl:hidden">
          <div className="container-fluid space-y-1 py-4">
            {mainNav.map((item) => {
              const hasSubLinks =
                "subLinks" in item && item.subLinks && item.subLinks.length > 0;

              if (hasSubLinks) {
                return (
                  <div key={item.href}>
                    <div className="flex items-stretch gap-1 rounded-lg">
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`min-w-0 flex-1 px-4 py-3 text-base font-medium duration-300 ease-out transition-[background-color] ${
                          pathname === item.href
                            ? "bg-[var(--Primary-200)] text-[var(--primary-950)]"
                            : "text-[var(--primary-950)] hover:bg-[#ABE0FF]"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((open) => !open)}
                        className="flex shrink-0 items-center justify-center  px-3 text-primary-950 duration-300 ease-out transition-[background-color] hover:bg-[#ABE0FF] border-l border-[#ccc]"
                        aria-expanded={mobileServicesOpen}
                        aria-label={
                          mobileServicesOpen
                            ? "Hide services submenu"
                            : "Show services submenu"
                        }
                      >
                        <Image
                          src="/images/icons/arrow-bottom.png"
                          alt=""
                          width={22}
                          height={22}
                          className={`transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      </button>
                    </div>
                    {mobileServicesOpen &&
                      item.subLinks?.map((sub) => {
                        const subTab = sub.href.includes("tab=")
                          ? sub.href.split("tab=")[1]
                          : null;
                        const isActive =
                          pathname === "/services" &&
                          subTab &&
                          tabParam === subTab;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={closeMobileMenu}
                            className={`block rounded-lg px-6 py-2 text-sm text-[var(--primary-950)] duration-300 ease-out transition-[background-color] hover:bg-[#ABE0FF] ${
                              isActive ? "bg-[var(--Primary-200)]" : ""
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                  </div>
                );
              }

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block rounded-lg px-4 py-3 text-base font-medium duration-300 ease-out transition-[background-color] ${
                      pathname === item.href
                        ? "bg-[var(--Primary-200)] text-[var(--primary-950)]"
                        : "text-[var(--primary-950)] hover:bg-[#ABE0FF]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}

            <Link
              href="https://www.whitehwk.com"
              onClick={closeMobileMenu}
              className="mt-4 block rounded-xl border border-[#0087D7]  px-3 py-2 text-center text-lg font-medium text-[#0087D7] shadow-[0px_10px_40px_0px_var(--primary-glow)] duration-300 ease-out transition-[opacity,box-shadow] hover:opacity-95 hover:shadow-[0px_10px_50px_0px_rgba(87,177,255,0.45)] flex items-center justify-center gap-2"
            >
              White Hawk
              <Image
                src="/images/icons/external-link.svg"
                alt="White Hawk"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-4 block rounded-xl border border-white bg-gradient-to-b from-[var(--primary-800)] to-[var(--primary-600)] px-3 py-2 text-center text-lg font-medium text-white shadow-[0px_10px_40px_0px_var(--primary-glow)] duration-300 ease-out transition-[opacity,box-shadow] hover:opacity-95 hover:shadow-[0px_10px_50px_0px_rgba(87,177,255,0.45)]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
