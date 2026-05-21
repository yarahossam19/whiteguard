import Image from "next/image";
import Link from "next/link";
import type { IndustryPageCertification } from "@/types/industry-page";

export interface IndustrySupportDetailSectionProps {
  supportTitle: string;
  bullets: string[];
  certifications: IndustryPageCertification[];
  imageSrc: string;
  imageAlt: string;
  showDetailSectionImage?: boolean;
}

/**
 * “How we support your sector” + certifications — shared industry detail band
 * (used on industries that reuse the bullet + certifications layout, e.g. industrial-services).
 */
export default function IndustrySupportDetailSection({
  supportTitle,
  bullets,
  certifications,
  imageSrc,
  imageAlt,
  showDetailSectionImage = true,
}: IndustrySupportDetailSectionProps) {
  return (
    <section className="border-t border-[#e7eef4] bg-[#fbfdfe] py-14 xl:py-20">
      <div className="container">
        <div
          className={`mx-auto flex max-w-[1140px] flex-col gap-12 ${showDetailSectionImage ? "xl:flex-row xl:items-start xl:gap-16" : ""}`}
        >
          {showDetailSectionImage ? (
            <div className="relative mx-auto w-full max-w-[553px] shrink-0 xl:mx-0 xl:w-[46%]">
              <div className="relative aspect-[553/620] w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-8px_rgba(0,56,89,0.15)]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 520px"
                />
              </div>
            </div>
          ) : null}

          <div
            className={`flex min-w-0 flex-1 flex-col gap-8 ${showDetailSectionImage ? "" : "mx-auto max-w-[720px]"}`}
          >
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#003859] sm:text-3xl">
                {supportTitle}
              </h2>
              <ul className="mt-6 space-y-3">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 font-jakarta text-base leading-relaxed text-[#52697A]"
                  >
                    <span
                      className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#00C3FF]"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {certifications.length > 0 ? (
              <div>
                <h3 className="font-jakarta text-lg font-semibold uppercase tracking-wide text-[#003859]">
                  Standards & certifications
                </h3>
                <ul className="mt-4 flex flex-wrap gap-6">
                  {certifications.map((cert) => (
                    <li
                      key={`${cert.id}-${cert.src}`}
                      className="flex h-14 w-[120px] items-center justify-center rounded-lg border border-[#e0e9f2] bg-white px-3 py-2 sm:h-16 sm:w-[140px]"
                    >
                      <Image
                        src={cert.src}
                        alt={cert.name}
                        width={112}
                        height={48}
                        className="max-h-12 w-auto object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-4 border-t border-[#e7eef4] pt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 font-jakarta text-sm font-medium text-[#006dad] underline-offset-4 hover:underline"
              >
                ← All industries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
