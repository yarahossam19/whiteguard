import Image from "next/image";
import type { PartnerProgramData } from "@/data/partner-program";
import { IconImage, partnerProgramIcons } from "./PartnerProgramIcons";

interface PartnerProgramWhySectionProps {
  data: PartnerProgramData["whyPartner"];
}

const compactIcons = {
  revenue: partnerProgramIcons.trending,
  delivery: partnerProgramIcons.zap,
  differentiation: partnerProgramIcons.briefcase,
};

export default function PartnerProgramWhySection({
  data,
}: PartnerProgramWhySectionProps) {
  const { title, subtitle, heroCard, tallCard, compactCards } = data;

  return (
    <section className="bg-[#e0e6eb]/25 px-6 py-20 lg:py-24">
      <div className="container mx-auto max-w-[1232px]">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 font-jakarta text-[clamp(32px,4vw,48px)] font-extrabold leading-tight text-[#003859]">
            {title}
          </h2>
          <p className="font-jakarta text-[clamp(17px,2vw,20px)] leading-7 text-[#52697A]">
            {subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Hero bento card */}
          <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-1000 hover:-translate-y-[18px] hover:shadow-[0_28px_50px_rgba(0,56,89,0.12)] lg:col-span-8">
            <div className="shrink-0 px-8 pt-8">
              <h3 className="mb-3 font-jakarta text-2xl font-bold text-[#003859]">
                {heroCard.title}
              </h3>
              <p className="max-w-xl font-jakarta text-lg leading-7 text-[#62748e]">
                {heroCard.description}
              </p>
            </div>
            <div className="mx-8 mb-0 mt-6 flex flex-1 rounded-t-[32px] border border-b-0 border-slate-200 bg-slate-50 p-4 pb-0 transition-all duration-1000 group-hover:rounded-[32px] group-hover:border-b group-hover:pb-4">
              <div className="relative w-full max-h-[160px] overflow-hidden rounded-t-2xl bg-slate-200 transition-[max-height,border-radius] duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:max-h-full group-hover:rounded-2xl max-md:max-h-[200px] max-md:group-hover:max-h-[220px]">
                <Image
                  src={heroCard.image}
                  alt=""
                  aria-hidden
                  width={1200}
                  height={800}
                  className="relative z-0 w-full object-cover object-top mix-blend-luminosity transition-opacity duration-1000 group-hover:opacity-0"
                />
                <Image
                  src={heroCard.image}
                  alt="WHITEGUARD platform dashboard preview"
                  width={1200}
                  height={800}
                  className="absolute inset-0 z-1 h-full w-full object-cover object-top opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                />
              </div>
            </div>
          </article>

          {/* Tall card */}
          <article className="flex flex-col justify-center gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:col-span-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-[#003859]">
              <IconImage src={partnerProgramIcons.zap} size={28} />
            </div>
            <h3 className="font-jakarta text-2xl font-bold text-[#003859]">
              {tallCard.title}
            </h3>
            <p className="font-jakarta text-lg leading-[29px] text-[#52697A]">
              {tallCard.description}
            </p>
          </article>

          {/* Compact cards */}
          {compactCards.map((card) => {
            const iconSrc =
              compactIcons[card.id as keyof typeof compactIcons] ??
              partnerProgramIcons.trending;
            return (
              <article
                key={card.id}
                className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#003859]">
                  <IconImage src={iconSrc} size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-2 font-jakarta text-lg font-bold text-[#003859]">
                    {card.title}
                  </h4>
                  <p className="font-jakarta text-sm leading-[23px] text-[#52697A]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
