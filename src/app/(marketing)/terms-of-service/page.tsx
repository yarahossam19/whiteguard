import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "WHITEGUARD Terms of Service.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-4 text-slate-600">Content coming soon...</p>
    </div>
  );
}
