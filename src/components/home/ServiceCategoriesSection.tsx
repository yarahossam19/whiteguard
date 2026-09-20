import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { ServicesSectionData } from "@/data/services-section";

interface ServiceCategoriesSectionProps {
  data: ServicesSectionData;
}

/**
 * 03 - Four service categories.
 *
 * Replaces the scroll-pinned card stack: four real links, each stating how
 * many service pages sit behind it. Each card carries the pillar colour that
 * already exists in the data as `borderColor`, used for the hover wipe and
 * the icon halo so the four are distinguishable at a glance.
 */
export default function ServiceCategoriesSection({
  data,
}: ServiceCategoriesSectionProps) {
  const total = data.services.reduce((sum, s) => sum + s.count, 0);

  return (
    <section className="relative w-full overflow-hidden bg-wash py-16 lg:py-24">
      <span
        aria-hidden
        className="orb pointer-events-none absolute -right-[12%] top-[10%] h-[380px] w-[380px] bg-accent/10"
      />

      <div className="container relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal y={14}>
              <p className="eyebrow text-accent">
                Services
              </p>
            </Reveal>
            <Reveal delay={80} y={22}>
              <h2 className="mt-3 max-w-[660px] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy">
                {data.heading.line1}{" "}
                <span className="text-gradient-ink">{data.heading.line2}</span>
              </h2>
            </Reveal>
            <Reveal delay={150} y={18}>
              <p className="mt-4 max-w-[580px] text-[15px] leading-[1.6] text-slate">
                {data.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} y={18}>
            <ButtonLink href={data.ctaHref} variant="ghost">
              Explore all {total} services
              <span className="go-arrow" aria-hidden>
                &rarr;
              </span>
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.services.map((service, i) => (
            <Reveal key={service.id} delay={i * 110} y={26}>
              <Link
                href={service.href}
                style={{ "--card-accent": service.borderColor } as CSSProperties}
                className="card-lift group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-linear-to-b from-white to-wash/55 p-6 hover:border-transparent"
              >
                <span className="card-wipe absolute inset-0 rounded-[var(--r-lg)]" aria-hidden />
                <span className="card-glow" aria-hidden />
                <span className="card-sheen" aria-hidden />

                <div className="flex items-start justify-between gap-3">
                  <span className="icon-plate flex size-14 shrink-0 items-center justify-center">
                    <Image
                      src={service.icon}
                      alt=""
                      width={36}
                      height={36}
                      className="icon-hover relative h-9 w-9 object-contain"
                      aria-hidden
                    />
                  </span>
                  <span className="rounded-[var(--r-pill)] bg-accent-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-accent-600">
                    {service.count} pages
                  </span>
                </div>

                <h3 className="mt-5 text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-navy">
                  {service.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-[1.6] text-slate">
                  {service.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold text-accent">
                  View {service.label}
                  <span className="go-arrow" aria-hidden>
                    &rarr;
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
