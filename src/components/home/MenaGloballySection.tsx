"use client";

import Image from "next/image";
import type { MenaGloballyData } from "@/data/mena-globally";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface MenaGloballySectionProps {
  data: MenaGloballyData;
}

type MapMarker = MenaGloballyData["map"]["markers"][number];

function MapMarkerPin({ marker }: { marker: MapMarker }) {
  return (
    <div
      className="group absolute z-10"
      style={{
        left: `${marker.left}%`,
        top: `${marker.top}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        type="button"
        className="block h-7 w-7 cursor-default rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0087D7] sm:h-8 sm:w-8"
        aria-label={marker.label}
        tabIndex={0}
      />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <span className="relative block rounded-md bg-white px-3 py-1.5 font-jakarta text-xs font-semibold text-[#003859] shadow-md">
          {marker.label}
          <span
            className="absolute left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-white"
            aria-hidden
          />
        </span>
      </span>
    </div>
  );
}

export default function MenaGloballySection({
  data,
}: MenaGloballySectionProps) {
  const {
    heading,
    paragraphs,
    paragraphs2,
    certifications,
    map: mapData,
  } = data;
  const markers = mapData.markers ?? [];

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
          <div className="flex flex-col gap-6 text-center xl:max-w-[571px] xl:text-left">
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
            <h6 className="font-jakarta text-[clamp(16px,1.6vw,18px)] mt-5 leading-0 font-semibold  text-[#003859]">
              Where We Operate
            </h6>
            {paragraphs2.map((paragraph, i) => (
              <p
                key={i}
                className="font-jakarta text-base leading-[1.8] text-[#52697A]"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap items-center justify-around gap-8 pt-[106px]">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex h-14 w-14 items-center justify-center    opacity-100 sm:h-16 sm:w-16"
                >
                  <Image
                    width={100}
                    height={100}
                    src={cert.src}
                    alt={cert.name}
                    className="h-full max-h-[54px] min-w-[107px] w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full shrink-0 xl:max-w-[50%]">
            <img
              src={mapData.src}
              alt={mapData.alt}
              className="h-full w-full object-cover"
            />
            {markers.map((marker) => (
              <MapMarkerPin key={marker.id} marker={marker} />
            ))}
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
