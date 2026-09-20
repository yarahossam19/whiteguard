import Image from "next/image";
import { ButtonLink, ExternalArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { WhiteHawkSectionData } from "@/data/white-hawk-section";

interface WhiteHawkSectionProps {
  data: WhiteHawkSectionData;
}

/**
 * 05 - White Hawk.
 *
 * Named here, sold on whitehawk.io. The CTA leaves the site, so it carries the
 * external-destination indicator and opens in a new tab.
 */
export default function WhiteHawkSection({ data }: WhiteHawkSectionProps) {
  const { heading, description, features, cta, dashboardImage } = data;

  return (
    <section className="grid-bg sheen relative w-full overflow-hidden bg-navy py-16 text-white lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="orb -left-[10%] top-[8%] h-[400px] w-[400px] bg-accent/30" />
        <span
          className="orb -right-[8%] bottom-[-16%] h-[360px] w-[360px] bg-[#38BDF8]/18"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal y={14}>
            <p className="eyebrow text-[#9bc4ff]">
              Powered by White Hawk
            </p>
          </Reveal>

          <Reveal delay={80} y={24}>
            <h2 className="mt-3 max-w-[560px] text-[clamp(28px,3.6vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              {heading.line1}
              {heading.line2}{" "}
              <span className="text-gradient">{heading.line3}</span>
            </h2>
          </Reveal>

          <Reveal delay={150} y={18}>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-[#9bb4e6]">
              {description}
            </p>
          </Reveal>

          <ul className="mt-7 flex flex-col gap-3">
            {features.map((feature, i) => (
              <Reveal key={feature} delay={220 + i * 100} x={-14} y={0} as="li">
                <span className="group flex items-start gap-3 rounded-[var(--r-md)] border border-white/10 bg-white/[0.04] p-3.5 text-[14px] leading-[1.5] text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08]">
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white"
                  >
                    &#10003;
                  </span>
                  {feature}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={560} y={16}>
            <div className="mt-7">
              <ButtonLink
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost-ondark"
                size="lg"
              >
                {cta.label}
                <ExternalArrow />
              </ButtonLink>
              <p className="mt-2.5 text-[12px] text-[#9bb4e6]">
                {cta.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} y={30} scale={0.97}>
          <div className="relative">
            <span
              aria-hidden
              className="absolute -inset-6 rounded-[28px] bg-accent/25 blur-3xl"
            />
            <div className="float-soft relative aspect-16/10 w-full overflow-hidden rounded-[var(--r-lg)] border border-white/15 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]">
              <Image
                src={dashboardImage}
                alt="The White Hawk platform dashboard"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
