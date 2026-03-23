import type { Metadata } from "next";
import BecomePartnerForm from "@/components/partners/BecomePartnerForm";

export const metadata: Metadata = {
  title: "Become a Partner | WHITEGUARD",
  description:
    "Submit your partnership application to join the WHITEGUARD partner ecosystem.",
};

export default function BecomeAPartnerPage() {
  return (
    <section className="flex w-full justify-center bg-white px-6 py-[80px]">
      <BecomePartnerForm />
    </section>
  );
}
