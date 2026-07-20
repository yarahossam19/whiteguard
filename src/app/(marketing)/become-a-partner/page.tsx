import type { Metadata } from "next";
import BecomePartnerForm from "@/components/partners/BecomePartnerForm";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/become-a-partner",
  title: "Become a Partner",
  description:
    "Submit your partnership application to join the Whiteguard partner ecosystem.",
});

export default function BecomeAPartnerPage() {
  return (
    <section className="flex w-full justify-center bg-white py-[80px]">
      <div className="container flex justify-center">
        <BecomePartnerForm />
      </div>
    </section>
  );
}
