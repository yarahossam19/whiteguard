import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { IndustriesSectionsData } from "@/data/industries-sections";

interface SectorsSectionProps {
  data: IndustriesSectionsData;
}

/** First sentence only - the full profile lives on the industries page. */
function firstSentence(text: string): string {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

/**
 * 07 - Who we serve.
 *
 * Cards link to /industries rather than /industries/{id}: the per-sector
 * detail routes are advertised in sitemap.ts but do not exist yet, so linking
 * to them from the home page would create six dead ends.
 */
export default function SectorsSection({ data }: SectorsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-wash py-16 lg:py-24">
      <span
        aria-hidden
        className="orb pointer-events-none absolute -left-[10%] bottom-[5%] h-[360px] w-[360px] bg-accent/10"
      />

      <div className="container relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={14}>
              <p className="eyebrow text-accent">
                Who we serve
              </p>
            </Reveal>
            <Reveal delay={80} y={22}>
              <h2 className="mt-3 max-w-[660px] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy">
                {data.header.title}
              </h2>
            </Reveal>
            <Reveal delay={150} y={18}>
              <p className="mt-4 max-w-[600px] text-[15px] leading-[1.6] text-slate">
                {data.header.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} y={18}>
            <ButtonLink href="/industries" variant="ghost">
              All industries
              <span className="go-arrow" aria-hidden>
                &rarr;
              </span>
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.industries.map((industry, i) => (
            <Reveal key={industry.id} delay={(i % 3) * 110} y={26}>
              <Link
                href="/industries"
                className="card-lift group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-linear-to-b from-white to-wash/55"
              >
                <span className="relative block h-[150px] w-full overflow-hidden bg-navy">
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading="lazy"
                    className="img-zoom object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent"
                  />
                  <span className="absolute bottom-3 left-4 right-4 text-[17px] font-extrabold leading-tight tracking-[-0.02em] text-white">
                    {industry.title}
                  </span>
                  <span className="corner-arrow right-4 top-4" aria-hidden>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </span>

                <span className="card-glow" aria-hidden />
                <span className="card-sheen" aria-hidden />
                <span className="flex flex-1 flex-col p-5">
                  <span className="flex-1 text-[13px] leading-[1.6] text-slate">
                    {firstSentence(industry.description)}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-accent">
                    View {industry.title}
                    <span className="go-arrow" aria-hidden>
                      &rarr;
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
