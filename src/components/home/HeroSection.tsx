import type { CSSProperties } from "react";
import { ButtonLink, GoArrow } from "@/components/ui/Button";
import type { HeroData } from "@/data/hero";
import type { ServicesSectionData } from "@/data/services-section";

interface HeroSectionProps {
  data: HeroData;
  /** The four service pillars, reused as the mark's caption so they cannot drift. */
  pillars: ServicesSectionData["services"];
}

/** Staggered entrance, CSS-only. See the note on the hero below. */
function delay(ms: number): CSSProperties {
  return { "--rise-delay": `${ms}ms` } as CSSProperties;
}

/**
 * 01 - Hero. Full-height navy stage.
 *
 * This section pulls itself up by --header-h so it starts at the top of the
 * viewport and the header sits over it. Without that the sticky header stacks a
 * flat navy bar above the hero and you see a hard seam where the hero glow
 * begins. Internal top padding of the same amount keeps content clear of it.
 *
 * The right side is the animated brand mark. The source GIF draws itself in
 * near-black teal (#072C43) on transparent, which is invisible against the navy,
 * so `.hero-mark img` knocks it out to white with `brightness(0) invert(1)` -
 * the whole asset is monochrome, so nothing is lost. It sits inside a ring halo
 * rather than on bare navy: a 700px mark alone on the right column reads as a
 * stray logo instead of a composition.
 *
 * A GIF cannot be paused, so the reduced-motion path is a <picture> source that
 * serves the last frame as a static PNG - the browser fetches only the one it
 * picks, which also spares those users the 420KB animation.
 *
 * The four service pillars used to float around the old radar as compass chips.
 * They now sit in a row beneath the mark: the wordmark is wide and the shield is
 * tall, so anything orbiting this asset lands on top of it.
 *
 * Nothing here is animated on entry by <Reveal>: that is gated on hydration
 * and an IntersectionObserver, which is right further down the page but would
 * hold the first screen blank until JS runs. The text uses a CSS-only
 * animation that starts on first paint.
 */
export default function HeroSection({ data, pillars }: HeroSectionProps) {
  const { eyebrow, headline, description, description2, ctas } = data;

  return (
    <section className="grid-bg sheen relative mt-[calc(var(--header-h)*-1)] flex min-h-svh w-full flex-col overflow-hidden bg-navy pt-[var(--header-h)] text-white">
      {/* Ambient layer - purely decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="orb left-[-8%] top-[-14%] h-[460px] w-[460px] bg-[#2563EB]/35" />
        <span
          className="orb right-[-10%] top-[14%] h-[420px] w-[420px] bg-[#38BDF8]/20"
          style={{ animationDelay: "-6s" }}
        />
        <span
          className="orb bottom-[-24%] left-[36%] h-[380px] w-[380px] bg-[#1D4FD7]/25"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="container relative z-10 grid flex-1 items-center gap-14 pt-10 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pt-12 lg:pb-20">
        <div className="flex flex-col gap-6">
          <p className="eyebrow rise text-[#9bc4ff]">
            {eyebrow}
          </p>

          <h1
            className="rise max-w-[680px] text-[clamp(38px,5.4vw,64px)] font-extrabold leading-[1.03] tracking-[-0.035em]"
            style={delay(90)}
          >
            <span>{headline.line1.bold}</span>
            <span className="text-gradient font-light">
              {headline.line1.light}
            </span>
            <span>{headline.line1.end}</span>
            <br />
            <span>{headline.line2.bold}</span>
            <span className="text-gradient font-light">
              {headline.line2.light}
            </span>
            <span>{headline.line2.end}</span>
          </h1>

          <p
            className="rise max-w-[560px] text-[clamp(17px,1.4vw,20px)] font-semibold leading-[1.45] text-white"
            style={delay(180)}
          >
            {description}
          </p>

          <p
            className="rise max-w-[560px] text-[15px] leading-[1.7] text-[#9bb4e6]"
            style={delay(250)}
          >
            {description2}
          </p>

          <div
            className="rise mt-2 flex flex-col flex-wrap gap-3 sm:flex-row"
            style={delay(330)}
          >
            {ctas.map((cta, i) => (
              <ButtonLink
                key={cta.href}
                href={cta.href}
                size="lg"
                variant={i === 0 ? "accent" : "ghost-ondark"}
              >
                {cta.label}
                {i === 0 && <GoArrow />}
              </ButtonLink>
            ))}
          </div>
        </div>

        {/* Animated brand mark */}
        <div
          className="rise flex flex-col items-center gap-7"
          style={delay(220)}
        >
          <div className="hero-mark relative mx-auto aspect-square w-full max-w-[330px] sm:max-w-[400px] lg:max-w-[470px]">
            {/* Halo: a soft core glow under a static and a slowly turning ring */}
            <span aria-hidden className="hero-mark-glow" />
            <span aria-hidden className="radar-ring inset-0" />
            <span
              aria-hidden
              className="radar-ring dashed animate-banner-orbit-spin inset-[9%] motion-reduce:animate-none"
            />

            {/*
              <picture> rather than next/image: the reduced-motion swap has to
              happen at source-selection time so only one of the two files is
              fetched, and next/image renders a single <img> with no <source>.
            */}
            <picture>
              <source
                media="(prefers-reduced-motion: reduce)"
                srcSet="/images/whiteguard-hero-static.png"
                width={700}
                height={700}
              />
              <img
                src="/images/whiteguard-hero.gif"
                alt=""
                width={700}
                height={700}
                fetchPriority="high"
                decoding="async"
                aria-hidden
                className="absolute left-[11%] top-[11%] h-auto w-[78%] object-contain"
              />
            </picture>
          </div>

          {/* The four pillars, in the order the services section lists them.
              The chip float is left in sync here: offsetting it per chip left
              the row permanently jagged, which reads as a layout bug rather
              than as motion. */}
          <ul className="flex flex-wrap justify-center gap-2.5">
            {pillars.slice(0, 4).map((pillar) => (
              <li key={pillar.id}>
                <span
                  className="orbit-chip"
                  style={{ "--chip-dot": pillar.borderColor } as CSSProperties}
                >
                  <i aria-hidden />
                  {pillar.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 hidden justify-center pb-8 lg:flex">
        <span className="scroll-cue flex flex-col items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          Scroll
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </section>
  );
}
