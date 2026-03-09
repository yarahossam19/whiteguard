import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | WHITEGUARD",
  description:
    "Learn about WHITEGUARD - your trusted partner in intelligent security monitoring.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
      <p className="mt-4 text-slate-600">
        Content coming soon...
      </p>
    </div>
  );
}
