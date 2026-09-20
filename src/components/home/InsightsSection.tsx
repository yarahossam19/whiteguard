import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { ResourcesData } from "@/data/resources";

interface InsightsSectionProps {
  data: ResourcesData;
}

/**
 * 10 - Latest insights.
 *
 * The three real published articles. No read-time is shown: that field does
 * not exist in the resources data and would have to be invented.
 */
export default function InsightsSection({ data }: InsightsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-wash py-16 lg:py-24">
      <div className="container relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={14}>
              <p className="eyebrow text-accent">
                Resources
              </p>
            </Reveal>
            <Reveal delay={80} y={22}>
              <h2 className="mt-3 max-w-[660px] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy">
                Latest from the team
              </h2>
            </Reveal>
            <Reveal delay={150} y={18}>
              <p className="mt-4 max-w-[600px] text-[15px] leading-[1.6] text-slate">
                {data.listing.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} y={18}>
            <ButtonLink href="/resources" variant="ghost">
              All resources
              <span className="go-arrow" aria-hidden>
                &rarr;
              </span>
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {data.items.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i * 130} y={26}>
              <Link
                href={item.href}
                className="card-lift group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-linear-to-b from-white to-wash/55"
              >
                <span className="card-glow" aria-hidden />
                <span className="card-sheen" aria-hidden />
                <span className="relative block h-[184px] w-full overflow-hidden bg-wash">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    loading="lazy"
                    className="img-zoom object-cover"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 inline-flex rounded-[var(--r-pill)] bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-accent-600 backdrop-blur-sm">
                    Insight
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-navy/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
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

                <span className="flex flex-1 flex-col p-5">
                  <span className="block text-[16px] font-extrabold leading-[1.3] tracking-[-0.01em] text-navy transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="mt-2.5 flex-1 text-[13px] leading-[1.6] text-slate">
                    {item.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-accent">
                    Read insight
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
