import { ButtonLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeProofData } from "@/data/home-proof";
import type { TestimonialsSectionData } from "@/data/testimonials-section";

interface ProofSectionProps {
  data: HomeProofData;
  testimonials: TestimonialsSectionData;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#2563EB" : "#E3E8EF"}
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/** First letter of the first two words - enough to read as a monogram. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * 08 - Proof.
 *
 * One zone: the featured client outcome and the testimonials sit together,
 * immediately before the certifications block, rather than being spread across
 * the page as they were previously.
 */
export default function ProofSection({
  data,
  testimonials,
}: ProofSectionProps) {
  const { featured } = data;

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 lg:py-24">
      <div className="container relative z-10">
        <Reveal y={14}>
          <p className="eyebrow text-accent">
            {data.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={80} y={22}>
          <h2 className="mt-3 max-w-[660px] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy">
            {data.heading}
          </h2>
        </Reveal>
        <Reveal delay={150} y={18}>
          <p className="mt-4 max-w-[600px] text-[15px] leading-[1.6] text-slate">
            {data.subtitle}
          </p>
        </Reveal>

        {/* Featured outcome */}
        <Reveal delay={200} y={28}>
          <div className="relative mt-10 overflow-hidden rounded-[var(--r-lg)] border border-line bg-gradient-to-br from-wash via-white to-accent-100/45 p-6 lg:p-9">
            <span
              aria-hidden
              className="orb pointer-events-none absolute -right-[6%] -top-[30%] h-[280px] w-[280px] bg-accent/12"
            />
            <div className="relative grid gap-9 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-[var(--r-pill)] bg-accent-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-accent-600">
                  {featured.pill}
                </span>
                <h3 className="mt-4 text-[clamp(24px,3vw,32px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-navy">
                  {featured.title}
                </h3>
                <blockquote className="mt-5 border-l-2 border-accent pl-4 text-[14px] leading-[1.65] text-ink italic">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <p className="mt-3 text-[13px] text-slate">
                  {featured.attribution}
                </p>
                <ButtonLink
                  href={featured.ctaHref}
                  variant="ghost"
                  className="group mt-6"
                >
                  {featured.ctaLabel}
                  <span className="go-arrow" aria-hidden>
                    &rarr;
                  </span>
                </ButtonLink>
              </div>

              <dl className="grid grid-cols-3 gap-3">
                {featured.metrics.map((metric, i) => (
                  <Reveal
                    key={metric.label}
                    delay={300 + i * 120}
                    y={16}
                    className="card-lift rounded-[var(--r-md)] border border-line bg-white/80 p-4 text-center backdrop-blur-sm hover:border-accent/40"
                  >
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <CountUp
                        value={metric.value}
                        className="block bg-gradient-to-br from-navy to-accent bg-clip-text text-[clamp(24px,3vw,32px)] font-extrabold leading-none text-transparent tabular-nums"
                      />
                      <span className="mt-2 block text-[11px] leading-[1.4] text-slate">
                        {metric.label}
                      </span>
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Testimonials */}
        <Reveal delay={80} y={20}>
          <h3 className="mt-16 text-[clamp(20px,2.4vw,26px)] font-extrabold tracking-[-0.02em] text-navy">
            {testimonials.heading}
          </h3>
          <p className="mt-3 max-w-[600px] text-[15px] leading-[1.6] text-slate">
            {testimonials.subtitle}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.testimonials.map((item, i) => (
            <Reveal key={item.id} delay={i * 130} y={26}>
              <figure className="card-lift group relative flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-line bg-linear-to-b from-white to-wash/55 p-6">
                <span
                  className="card-wipe absolute inset-0 rounded-[var(--r-lg)]"
                  aria-hidden
                />
                <span className="card-glow" aria-hidden />
                <span className="card-sheen" aria-hidden />
                {/* Watermark, not punctuation: the quote already has its own
                    marks and this would be read out twice. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-0 select-none font-serif text-[88px] leading-none text-accent-100/80 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-accent/20"
                >
                  &rdquo;
                </span>
                <Stars rating={item.rating} />
                <blockquote className="relative mt-4 flex-1 text-[13px] leading-[1.7] text-ink">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-navy to-accent text-[13px] font-extrabold tracking-[0.02em] text-white shadow-[0_8px_18px_-10px_rgba(11,42,91,0.9)]"
                  >
                    {initials(item.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-extrabold text-navy">
                      {item.name}
                    </span>
                    <span className="block text-[12px] text-slate">
                      {item.title}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
