import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeProcessData } from "@/data/home-process";

interface ProcessSectionProps {
  data: HomeProcessData;
}

/**
 * 06 - How we work.
 *
 * Numbered because the order carries meaning. A rail draws left-to-right when
 * the section enters the viewport, and the connectors rotate to point down
 * once the grid stacks (see globals.css).
 */
export default function ProcessSection({ data }: ProcessSectionProps) {
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

        {/* Progress rail - draws across as the section arrives */}
        <Reveal
          variant="rail"
          className="mt-10 hidden h-[3px] w-full rounded-full bg-line lg:block"
        >
          <span className="sr-only" />
        </Reveal>

        <ol className="mt-8 grid gap-y-14 lg:mt-6 lg:grid-cols-4 lg:gap-x-11 lg:gap-y-0">
          {/* step-connector sits on each <li> so its :last-child rule can see
              the real siblings and drop the trailing arrow. */}
          {data.steps.map((step, i) => (
            <Reveal
              key={step.id}
              delay={i * 140}
              y={26}
              as="li"
              className="step-connector relative"
            >
              <div className="card-lift group relative h-full overflow-hidden rounded-[var(--r-lg)] border border-line bg-linear-to-b from-white to-wash/55 p-6">
                <span className="card-wipe absolute inset-0 rounded-[var(--r-lg)]" aria-hidden />
                <span className="card-glow" aria-hidden />
                <span className="card-sheen" aria-hidden />
                <span className="ghost-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="step-dot relative inline-flex size-9 items-center justify-center rounded-full bg-accent text-[13px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.9)]">
                  {i + 1}
                </span>

                <span className="mt-4 block text-[10px] font-extrabold tracking-[0.14em] text-accent-600">
                  {step.stage}
                </span>
                <h3 className="mt-1.5 text-[18px] font-extrabold tracking-[-0.02em] text-navy">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-[1.6] text-slate">
                  {step.description}
                </p>
                <Link
                  href={step.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-accent hover:underline"
                >
                  {step.title} services
                  <span className="go-arrow" aria-hidden>
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
