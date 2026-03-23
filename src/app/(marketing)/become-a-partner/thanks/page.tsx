import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";

export const metadata: Metadata = {
  title: "Application Received | WHITEGUARD",
  description: "Thank you for applying to partner with WHITEGUARD.",
};

export default function BecomePartnerThanksPage() {
  return (
    <section className="flex min-h-[60vh] w-full items-center justify-center bg-white px-6 py-[80px]">
      <div className="mx-auto flex w-full max-w-[1183px] flex-col items-center gap-[50px]">
        {/* Heading + description */}
        <div className="flex w-full max-w-[1183px] flex-col items-center gap-4">
          <div className="flex flex-wrap items-end justify-center gap-3">
            <span className="rounded-[2px] bg-[#003859] px-1 pb-0.5 pt-1 font-jakarta text-[40px] font-extrabold italic leading-[1.2] tracking-[1.5px] text-white">
              Success!
            </span>
            <span className="font-jakarta text-[40px] font-bold leading-[1.2] tracking-[1.5px] text-[#003859]">
              You&apos;re on our radar
            </span>
          </div>
          <p className="max-w-[1183px] text-center font-jakarta text-[20px] font-medium leading-[1.5] tracking-[1.5px] text-[#52697a]">
            Thank you for applying to partner with us.
            <br />
            Our team reviews all applications within 24–48 hours. Keep an eye on
            your inbox, we&apos;ll be reaching out soon!
          </p>
        </div>

        {/* Back to Home button */}
        <div>
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
      </div>
    </section>
  );
}
