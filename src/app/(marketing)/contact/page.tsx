import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";
import ContactHero from "@/components/contact/ContactHero";
export const metadata: Metadata = {
  title: "Contact Us ",
  description:
    "Get in touch with Whiteguard. Start your security conversation or reach us by phone, email, or address.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero
        headline={{ line1: "Contact Us", line2: "" }}
        subtitle="Get in touch with Whiteguard. Start your security conversation or reach us by phone, email, or address."
      />{" "}
      <ContactPageContent />{" "}
    </>
  );
}
