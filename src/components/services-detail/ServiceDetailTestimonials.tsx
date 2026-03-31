import Image from "next/image";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar?: string;
}

interface ServiceDetailTestimonialsProps {
  testimonials: Testimonial[];
}

const AVATAR_COLORS = [
  "bg-[#0087D7]",
  "bg-[#003859]",
  "bg-[#0891b2]",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ServiceDetailTestimonials({
  testimonials,
}: ServiceDetailTestimonialsProps) {
  return (
    <>
      <SectionVideoSeparator
        direction="top"
        videoSrc="/videos/wave.mp4"
        className="z-[-1] pt-150"
      />
      <section
        className="flex w-full flex-col items-center py-16 lg:py-20"
        style={{
          background:
            "linear-gradient(180deg, rgb(171, 225, 255) 0%, rgb(231, 246, 255) 20%, rgb(231, 246, 255) 80%, rgb(171, 224, 255) 100%)",
        }}
      >
        <div className="container flex w-full flex-col items-center gap-12 lg:gap-16">
        <h2 className="text-center font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
          Words of Satisfaction from Our Clients
        </h2>
        <div className="mx-auto grid w-full max-w-[1152px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative flex flex-col items-center rounded-[16px] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] pt-16"
            >
              <div className="absolute -top-8 left-1/2 size-16 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white shadow-lg">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center font-jakarta text-lg font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  >
                    {getInitials(t.name)}
                  </div>
                )}
              </div>
              <p className="mb-6 text-center font-jakarta text-[15px] italic leading-[25.5px] text-[#52697a]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-jakarta text-[15px] font-normal leading-[22.5px] text-[#003859]">
                {t.name}
              </p>
              <p className="font-jakarta text-[13px] font-normal leading-[19.5px] text-[#52697a]">
                {t.title}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        videoSrc="/videos/wave.mp4"
        transform="rotateX(180deg)"
      />
    </>
  );
}
