import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";

export const metadata: Metadata = {
  title: "Message Received | WHITEGUARD",
  description: "Thank you for contacting WHITEGUARD.",
};

export default function ContactThanksPage() {
  return (
    <section className="flex min-h-[60vh] w-full items-center justify-center bg-white py-[80px]">
      <div className="container flex w-full max-w-[1183px] flex-col items-center gap-[50px]">
        <div className="flex w-full max-w-[1183px] flex-col items-center gap-4">
          <div className="flex flex-wrap items-end justify-center gap-3">
            <span className="rounded-[2px] bg-[#003859] px-1 pb-0.5 pt-1 font-jakarta text-[40px] font-extrabold italic leading-[1.2] tracking-[1.5px] text-white">
              Success!
            </span>
            <span className="font-jakarta text-[40px] font-bold leading-[1.2] tracking-[1.5px] text-[#003859]">
              We&apos;ll be in touch soon
            </span>
          </div>
          <p className="max-w-[1183px] text-center font-jakarta text-[20px] font-medium leading-[1.5] tracking-[1.5px] text-[#52697a]">
            Thank you for reaching out.
            <br />
            Our team will respond within 24 hours. Please check your inbox.
          </p>
        </div>

        <HoverSwapButton
          href="/"
          label="Back to Home"
          hoverLabel="Back to Home"
          variant="secondary"
          showChevrons={false}
          imgSrc="/images/icons/arrow-right-2.svg"
          showImg={true}
        />
      </div>
    </section>
  );
}
