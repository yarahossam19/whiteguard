import { ButtonLink, GoArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { CtaSectionData } from "@/data/cta-section";

interface CTASectionProps {
  data: CtaSectionData;
}

/**
 * 11 - Final CTA.
 *
 * The section ground is light and the CTA itself is a contained navy card. As a
 * full-bleed navy band it ran straight into the navy footer with no visible
 * boundary, and it also made the page foot navy-light-navy-navy. Containing it
 * separates the two, and the final ask reads as a distinct object rather than
 * just another dark band.
 */
export default function CTASection({ data }: CTASectionProps) {
  return (
    <section className="w-full bg-wash py-16 lg:py-24">
      <div className="container">
        <Reveal y={26}>
          <div className="grid-bg relative overflow-hidden rounded-[var(--r-lg)] bg-navy px-6 py-14 text-center text-white lg:px-16 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <span className="orb left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 bg-accent/30" />
            </div>

            <div className="relative z-10">
              <h2 className="mx-auto max-w-[720px] text-[clamp(27px,3.6vw,42px)] font-extrabold leading-[1.07] tracking-[-0.035em] text-white">
                {data.heading.line1}{" "}
                <span className="text-gradient">{data.heading.line2}</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.65] text-[#9bb4e6]">
                {data.subtext}
              </p>

              <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
                <ButtonLink href={data.button.href} size="lg" variant="accent">
                  {data.button.label}
                  <GoArrow />
                </ButtonLink>
                <ButtonLink href="/services" size="lg" variant="ghost-ondark">
                  Explore our services
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
