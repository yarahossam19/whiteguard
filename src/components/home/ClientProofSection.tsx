import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import type { ClientLogosData } from "@/data/client-logos";
import type { HomeMetricsData } from "@/data/home-metrics";

interface ClientProofSectionProps {
  data: HomeMetricsData;
  logos: ClientLogosData;
}

/**
 * 02 - Trust bar: client logos + metrics.
 *
 * The logo strip is a pure-CSS marquee. The shared <ClientLogos> component
 * paginates 23 logos seven at a time with a JS flip, which meant most of the
 * roster was never seen and the section needed client JS to render at all.
 * Duplicating the list into one track and translating it -50% loops seamlessly
 * with no JS, shows every logo, and pauses on hover so a name can be read.
 * <ClientLogos> is left alone - the partners hero and service pages use it.
 *
 * Metrics sit in a bordered band and count up once scrolled into view.
 */
export default function ClientProofSection({
  data,
  logos,
}: ClientProofSectionProps) {
  /* Two passes of the roster: the second is the seam the -50% loop lands on. */
  const track = [...logos, ...logos];

  return (
    <section className="relative w-full overflow-hidden border-b border-line bg-white py-14 lg:py-20">
      <div className="container relative z-10">
        {/* Both tracks are minmax(0,...): a bare `1fr` resolves to
            minmax(auto, 1fr), and the marquee track is width:max-content, so
            its min-content contribution is the whole duplicated roster. That
            forced the text column down to one word per line and pushed the
            strip past the container. min-w-0 on the marquee cell stops the
            same overflow inside the track. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center lg:gap-12">
          {/* Statement */}
          <Reveal y={18} className="min-w-0">
            <p className="eyebrow whitespace-nowrap text-accent">
              {data.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(21px,2.4vw,27px)] font-extrabold leading-[1.2] tracking-[-0.025em] text-navy">
              {data.logosHeading}
            </h2>
            <p className="mt-3 text-[14px] leading-[1.6] text-slate">
              Banks, fintechs, insurers, healthcare, energy and infrastructure
              across the region.
            </p>
          </Reveal>

          {/* Marquee */}
          <Reveal delay={110} y={18} className="min-w-0">
            <div className="marquee-wrap relative w-full rounded-[var(--r-lg)] border border-line bg-wash/60 py-4">
              <div className="marquee-track">
                {track.map((logo, i) => (
                  <span
                    key={`${logo.id}-${i}`}
                    className="marquee-item"
                    /* The roster is duplicated for the loop, so the copies are
                       hidden from assistive tech to avoid reading it twice. */
                    aria-hidden={i >= logos.length ? true : undefined}
                  >
                    <Image
                      src={logo.src}
                      alt={i >= logos.length ? "" : logo.alt}
                      width={140}
                      height={48}
                      loading="lazy"
                      className="max-h-12 w-auto max-w-[140px] object-contain"
                    />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Metrics band */}
        <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-[var(--r-lg)] border border-line bg-linear-to-b from-white to-wash lg:mt-14 lg:grid-cols-4">
          {data.metrics.map((metric, i) => (
            <Reveal
              key={metric.id}
              delay={i * 110}
              y={18}
              className={[
                "stat-cell group relative px-6 py-8 text-center transition-colors duration-300 hover:bg-white",
                /* Hairlines instead of gap-px so the band reads as one object. */
                i % 2 === 1 ? "border-l border-line" : "",
                i < 2 ? "border-b border-line lg:border-b-0" : "",
                i === 2 ? "lg:border-l lg:border-line" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <CountUp
                  value={metric.value}
                  className="block bg-linear-to-br from-navy to-accent bg-clip-text text-[clamp(32px,4vw,46px)] font-extrabold leading-none tracking-[-0.035em] text-transparent tabular-nums"
                />
                <span
                  aria-hidden
                  className="mx-auto mt-4 block h-0.5 w-8 rounded-full bg-line transition-all duration-300 group-hover:w-16 group-hover:bg-accent"
                />
                <span className="mt-4 block text-[13px] leading-[1.45] font-medium text-slate">
                  {metric.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
