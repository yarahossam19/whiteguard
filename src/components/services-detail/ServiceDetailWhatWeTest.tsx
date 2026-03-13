import Image from "next/image";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface TestItem {
  title: string;
  description: string;
}

interface ServiceDetailWhatWeTestProps {
  heading: string;
  subtitle: string;
  items: TestItem[];
}

export default function ServiceDetailWhatWeTest({
  heading,
  subtitle,
  items,
}: ServiceDetailWhatWeTestProps) {
  return (
    <>
      <SectionVideoSeparator direction="top" videoSrc="/videos/wave.mp4" />
      <section
        className="flex w-full flex-col items-center gap-12 px-4 py-16 lg:gap-16 lg:py-20"
        style={{
          background:
            "linear-gradient(180deg, rgb(171, 225, 255) 0%, rgb(231, 246, 255) 20%, rgb(231, 246, 255) 80%, rgb(171, 224, 255) 100%)",
        }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
            {heading}
          </h2>
          <p className="font-jakarta text-[16px] font-normal leading-[24px] text-[#52697a]">
            {subtitle}
          </p>
        </div>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:gap-[86px]">
          {/* Illustration placeholder - use offensive security illustration */}
          <div className="relative h-[300px] w-full shrink-0 lg:h-[413px] lg:w-[412px]">
            <Image
              src="/images/services/offensive-pt.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <Image
                  src="/images/icons/check-circle.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="mt-0.5 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-jakarta text-[18px] font-normal leading-[1.2] text-[#003859]">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-jakarta text-[16px] font-normal leading-[1.5] text-[#52697a]">
                    {item.description}
                  </p>
                </div>
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
