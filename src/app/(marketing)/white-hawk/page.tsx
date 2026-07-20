import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/white-hawk",
  title: "White Hawk | WhiteGuard",
  description: "White Hawk Security Platform.",
});

export default function WhiteHawkPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold text-slate-900">White Hawk</h1>
      <p className="mt-4 text-slate-600">Content coming soon...</p>
    </div>
  );
}
