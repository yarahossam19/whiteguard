import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation | WHITEGUARD",
  description:
    "Schedule a consultation with our security experts.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Book a Consultation</h1>
      <p className="mt-4 text-slate-600">
        Contact form coming soon...
      </p>
    </div>
  );
}
