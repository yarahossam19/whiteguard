"use client";

import Image from "next/image";
import type { MenaGloballyData } from "@/data/mena-globally";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface MenaGloballySectionProps {
  data: MenaGloballyData;
}

export default function MenaGloballySection({
  data,
}: MenaGloballySectionProps) {
  const { heading, paragraphs, certifications, map: mapData } = data;
  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />
      <section
        className="relative w-full overflow-hidden py-16 xl:py-24"
        style={{
          background:
            "linear-gradient(180deg, #ABE0FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="container flex w-full flex-col-reverse items-center justify-between gap-12 xl:flex-row xl:gap-16">
          {/* Left: Text + Certifications */}
          <div className="flex xl:max-w-[571px] flex-col gap-6 text-center xl:text-left">
            <div className="flex flex-col gap-0">
              <h2 className="font-jakarta text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.15] text-[#003859]">
                {heading.line1}
              </h2>
              <h2 className="font-jakarta text-[clamp(32px,4vw,44px)] font-extrabold leading-[1.15] text-[#0087D7]">
                {heading.line2}
              </h2>
            </div>

            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="font-jakarta text-base leading-[1.8] text-[#52697A]"
              >
                {paragraph}
              </p>
            ))}

            {/* Certification logos */}
            <div className="flex flex-wrap justify-around items-center pt-[106px] gap-8">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex h-14 w-14 items-center justify-center grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100 sm:h-16 sm:w-16"
                >
                  <Image
                    width={100}
                    height={100}
                    src={cert.src}
                    alt={cert.name}
                    className="h-full w-full object-contain max-h-[54px] min-w-[107px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map */}
          <div className="relative w-full shrink-0 xl:max-w-[50%]">
            <img
              src={mapData.src}
              alt={mapData.alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave-bottom.mp4"
      />
    </>
  );
}
