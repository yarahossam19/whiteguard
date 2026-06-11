import type { PartnerProgramData } from "@/data/partner-program";
import { IconImage, partnerProgramIcons } from "./PartnerProgramIcons";

interface PartnerProgramBenefitsMarqueeProps {
  data: PartnerProgramData["benefits"];
}

const benefitIcons = [
  partnerProgramIcons.faster,
  partnerProgramIcons.overhead,
  partnerProgramIcons.revenue,
  partnerProgramIcons.differentiate,
];

function BenefitCard({
  title,
  description,
  iconSrc,
}: {
  title: string;
  description: string;
  iconSrc: string;
}) {
  return (
    <article className="flex w-[380px] shrink-0 items-center gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm max-[500px]:w-[min(380px,85vw)]">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-[#003859]">
        <IconImage src={iconSrc} size={32} />
      </div>
      <div className="min-w-0 text-left">
        <h3 className="mb-1 font-jakarta text-xl font-bold text-[#003859]">
          {title}
        </h3>
        <p className="font-jakarta text-base leading-6 text-[#6a7282]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function PartnerProgramBenefitsMarquee({
  data,
}: PartnerProgramBenefitsMarqueeProps) {
  const { subtitle, items } = data;

  const cards = items.map((item, index) => ({
    ...item,
    iconSrc: benefitIcons[index] ?? partnerProgramIcons.faster,
  }));

  return (
    <section className="mb-24 bg-white px-0 py-10 shadow-[0_0_24px_rgba(0,0,0,0.01),0_0_16px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex max-w-[1232px] flex-col items-center gap-12">
        <p className="max-w-[632px] px-2 text-center font-jakarta text-[clamp(17px,2vw,20px)] leading-7 text-[#4a5565]">
          {subtitle}
        </p>

        <div
          className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          aria-label="Partner benefits"
        >
          <div className="flex w-max animate-[marquee_50s_linear_infinite] gap-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4 motion-reduce:animate-none">
            {[0, 1].map((chunk) => (
              <div
                key={chunk}
                className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:contents"
              >
                {cards.map((card) => (
                  <BenefitCard
                    key={`${chunk}-${card.id}`}
                    title={card.title}
                    description={card.description}
                    iconSrc={card.iconSrc}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
