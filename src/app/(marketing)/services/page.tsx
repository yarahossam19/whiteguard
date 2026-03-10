import type { Metadata } from "next";
import Link from "next/link";
import { footerNav } from "@/config/site";

export const metadata: Metadata = {
  title: "Services | WHITEGUARD",
  description:
    "Explore our security services: Offensive Security, Defensive Security, GRC, and Training.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Services</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {footerNav.services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="rounded-lg border border-slate-200 p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="font-semibold text-slate-900">{service.label}</h2>
            <p className="mt-2 text-sm text-slate-600">Learn more →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
