import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { CertificationsSectionData } from "@/data/certifications-section";

interface CertificationsSectionProps {
  data: CertificationsSectionData;
}

/**
 * 09 - Certifications & compliance.
 *
 * Badge names are read off the artwork itself. Three labels were wrong in the
 * previous data (`Certification 1`, and two entries both named `NCA ECC-1:2018`
 * while showing NIST SP 800-53 and a padlock), so the alt text was misleading
 * to screen readers and to image search. The frameworks row is text only - no
 * logo is shown for a framework we do not hold a badge for.
 *
 * The marks sit directly on the navy - no plates. The supplied badges could not
 * do that as shipped: two are dark ink on a light disc and three are light ink
 * on an opaque dark plate, so a CSS knockout would have flattened half of them
 * into solid white blocks. They are pre-processed into white-on-transparent
 * marks instead, by scripts/generate-certification-marks.mjs - see the note
 * there for how the two polarities are reconciled.
 *
 * Each mark gets the same fixed-height slot and is centred in it, so the six
 * line up on a common baseline despite their very different outlines. They rest
 * a little under full opacity so the row does not out-shout the heading, and
 * come up to full on hover.
 */
export default function CertificationsSection({
  data,
}: CertificationsSectionProps) {
  return (
    <section className="grid-bg sheen relative w-full overflow-hidden bg-navy py-16 text-white lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="orb left-1/2 top-[-18%] h-[420px] w-[420px] -translate-x-1/2 bg-accent/25" />
        <span
          className="orb -right-[10%] bottom-[-20%] h-[320px] w-[320px] bg-[#38BDF8]/15"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="container relative z-10">
        <Reveal y={14}>
          <p className="eyebrow text-[#9bc4ff]">
            {data.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80} y={24}>
          <h2 className="mt-3 max-w-[720px] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
            {data.heading}
          </h2>
        </Reveal>
        <Reveal delay={150} y={18}>
          <p className="mt-4 max-w-[600px] text-[15px] leading-[1.65] text-[#9bb4e6]">
            {data.subtitle}
          </p>
        </Reveal>

        {/* Accreditation badges */}
        <Reveal delay={200} y={14}>
          <h3 className="mt-12 text-[#9bc4ff]">
            {data.badgesHeading}
          </h3>
        </Reveal>

        <ul className="std-row mt-6 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {data.badges.map((badge, i) => (
            <Reveal key={badge.id} delay={i * 80} y={20} as="li" className="std-item">
              <span className="flex h-[78px] items-center justify-center">
                {/* Fixed box plus object-contain rather than `w-auto` and a
                    max-height: with w-auto the rendered size follows whatever
                    resolution the optimiser happens to serve, and the smallest
                    marks came out below the cap.

                    unoptimized because the optimiser was handing back bitmaps
                    at about a third of source - small enough to look soft blown
                    up into this box. These are 3-21KB white-on-transparent PNGs
                    that were generated at the size they are needed, so there is
                    nothing for it to save. */}
                <Image
                  src={badge.src}
                  alt={badge.name}
                  width={142}
                  height={78}
                  unoptimized
                  loading="lazy"
                  className="std-mark h-[78px] w-[142px] object-contain"
                />
              </span>

              <span className="mt-4 block text-center text-[13px] font-extrabold leading-tight tracking-[-0.01em] text-white">
                {badge.name}
              </span>
              <span className="mt-1.5 block text-center text-[11.5px] leading-[1.4] text-[#9bb4e6]">
                {badge.detail}
              </span>
            </Reveal>
          ))}
        </ul>

        {/* Frameworks we take clients through */}
        <Reveal delay={80} y={14}>
          <h3 className="mt-14 text-[#9bc4ff]">
            {data.frameworksHeading}
          </h3>
        </Reveal>

        <ul className="mt-5 flex flex-wrap gap-2.5">
          {data.frameworks.map((framework, i) => (
            <Reveal key={framework.href} delay={i * 70} y={14} as="li">
              <Link
                href={framework.href}
                className="chip-link group inline-flex min-h-[44px] items-center gap-2 rounded-[var(--r-pill)] border border-white/25 px-4 text-[13px] font-semibold text-white hover:border-white/60 hover:bg-white/10"
              >
                {framework.label}
                <span className="go-arrow text-[11px] opacity-60" aria-hidden>
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} y={16}>
          <div className="mt-10">
            <ButtonLink
              href={data.cta.href}
              variant="ghost-ondark"
              size="lg"
            >
              {data.cta.label}
              <span className="go-arrow" aria-hidden>
                &rarr;
              </span>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
