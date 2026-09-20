import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeCoverageData } from "@/data/home-coverage";

interface CoverageSectionProps {
  data: HomeCoverageData;
}

const FLOW_PATHS = [
  { id: "covP1", d: "M210,90 C360,80 460,240 550,260", slow: false },
  { id: "covP2", d: "M200,230 C340,230 460,255 550,260", slow: true },
  { id: "covP3", d: "M230,400 C360,390 470,290 550,260", slow: false },
  { id: "covP4", d: "M890,100 C740,90 640,240 550,260", slow: false },
  { id: "covP5", d: "M900,240 C760,240 640,258 550,260", slow: true },
  { id: "covP6", d: "M870,410 C740,400 630,290 550,260", slow: false },
];

const PARTICLES = [
  { path: "covP1", dur: "3.6s", begin: "0s", r: 4, fill: "#2563EB" },
  { path: "covP2", dur: "4.4s", begin: "0.7s", r: 3.5, fill: "#1D4FD7" },
  { path: "covP3", dur: "3.9s", begin: "1.2s", r: 4, fill: "#2563EB" },
  { path: "covP4", dur: "3.5s", begin: "0.4s", r: 4, fill: "#2563EB" },
  { path: "covP5", dur: "4.2s", begin: "1s", r: 3.5, fill: "#1D4FD7" },
  { path: "covP6", dur: "3.8s", begin: "1.6s", r: 4, fill: "#2563EB" },
];

function MiniCard({
  title,
  detail,
  position,
  delay,
}: {
  title: string;
  detail: string;
  position: string;
  delay: string;
}) {
  return (
    <div className={`cov-float ${position}`} aria-hidden>
      <div className="mini-ui">
        <div className="dots">
          <i />
          <i />
          <i />
        </div>
        <b>{title}</b>
        <span>{detail}</span>
        <div className="bar">
          <em style={{ animationDelay: delay }} />
        </div>
      </div>
    </div>
  );
}

/**
 * 04 - Coverage visual.
 *
 * Decorative: the stage is aria-hidden and every claim it makes in motion is
 * repeated as text in the three cards below it. All animation stops under
 * prefers-reduced-motion (see globals.css).
 *
 * The hub shows the WhiteGuard mark rather than a text label - hence no
 * `coreLabel` in home-coverage.json any more.
 */
export default function CoverageSection({ data }: CoverageSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 lg:py-24">
      <div className="container relative z-10">
        <Reveal y={20}>
          <h2 className="mx-auto max-w-[820px] text-center text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy">
            {data.heading}
          </h2>
        </Reveal>
        <Reveal delay={90} y={16}>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-[15px] leading-[1.6] text-slate">
            {data.subtitle}
          </p>
        </Reveal>

        <Reveal delay={150} y={14}>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {data.columnLabels.map((label) => (
              <span
                key={label}
                className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-navy"
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="cov-stage mt-3" aria-hidden>
          <svg
            className="cov-svg"
            viewBox="0 0 1100 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {FLOW_PATHS.map((p) => (
              <path
                key={p.id}
                id={p.id}
                className={p.slow ? "flow slow" : "flow"}
                d={p.d}
              />
            ))}
            {PARTICLES.map((particle, i) => (
              <circle key={i} r={particle.r} fill={particle.fill}>
                <animateMotion
                  dur={particle.dur}
                  begin={particle.begin}
                  repeatCount="indefinite"
                >
                  <mpath href={`#${particle.path}`} />
                </animateMotion>
              </circle>
            ))}
          </svg>

          {data.cardsLeft.map((card, i) => (
            <MiniCard
              key={card.id}
              title={card.title}
              detail={card.detail}
              position={card.position}
              delay={`${i * 0.5}s`}
            />
          ))}

          <div className="cov-hub">
            <div className="cov-orbit" />
            <div className="cov-orbit inner" />
            <div className="cov-pulse" />
            <div className="cov-pulse d2" />
            <div className="cov-core">
              <Image
                src="/images/logo-white.svg"
                alt=""
                width={64}
                height={49}
                aria-hidden
              />
            </div>
            {data.nodes.map((node) => (
              <span key={node.id} className={`cov-node ${node.position}`}>
                {node.label}
              </span>
            ))}
          </div>

          {data.cardsRight.map((card, i) => (
            <MiniCard
              key={card.id}
              title={card.title}
              detail={card.detail}
              position={card.position}
              delay={`${0.3 + i * 0.5}s`}
            />
          ))}
        </div>
{/*<div className="mt-6 grid gap-5 lg:grid-cols-3">
          {data.summary.map((item, i) => (
            <Reveal key={item.id} delay={i * 120} y={24}>
              <Link
                href={item.href}
                className="card-lift group flex h-full flex-col rounded-[var(--r-lg)] border border-line bg-white p-6"
              >
                <span className="card-wipe absolute inset-0 rounded-[var(--r-lg)]" aria-hidden />
                <span className="inline-flex w-fit items-center rounded-[var(--r-pill)] bg-accent-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-accent-600">
                  {item.pill}
                </span>
                <h3 className="mt-4 text-[18px] font-extrabold tracking-[-0.02em] text-navy">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-[1.6] text-slate">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold text-accent">
                  {item.title}
                  <span className="go-arrow" aria-hidden>
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div> */}
      </div>
    </section>
  );
}
