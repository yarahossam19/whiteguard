import Image from "next/image";
import type { PartnersGrowthData } from "@/data/partners-growth";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface PartnersGrowthSectionProps {
  data: PartnersGrowthData;
}

const MAX_BAR_HEIGHT = 145;
const BAR_WIDTH = 110.494;
const BORDER_RADIUS = 10;

export default function PartnersGrowthSection({
  data,
}: PartnersGrowthSectionProps) {
  const { heading, subtitle, sectionTitle, growthIcon, items } = data;

  return (
    <>
      <SectionVideoSeparator
        direction="top"
        transform="rotateX(0)"
        videoSrc="/videos/wave.mp4"
      />
      <section
        className="relative w-full overflow-hidden px-6 py-20 lg:px-[7vw] lg:py-24"
        style={{
          background:
            "linear-gradient(180deg, #ABE1FF 0%, #E7F6FF 20%, #E7F6FF 80%, #ABE0FF 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center">
          {/* Heading + Subtitle */}
          <div className="mb-16 flex flex-col items-center gap-4 text-center">
            <h2 className="font-jakarta text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-[-1.05px] text-[#003859]">
              {heading.line1}
              <br />
              <span className="text-[#0087D7]">{heading.line2}</span>
            </h2>
            <p className="max-w-[508px] font-jakarta text-[15px] font-normal leading-normal text-[#52697A]">
              {subtitle}
            </p>
          </div>

          {/* Section Title with Growth Icon */}
          <div className="mb-16 flex w-full max-w-[1200px] items-center gap-4 self-start lg:pl-4">
            <h3 className="font-jakarta text-[clamp(24px,3vw,32px)] font-extrabold leading-[1.2] text-[#003859]">
              {sectionTitle}
            </h3>
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src={growthIcon}
                alt=""
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
          </div>

          {/* Bar Chart  */}
          <div className=" relative flex w-full items-end justify-between gap-4 lg:gap-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="relative z-10 flex flex-1 flex-col   justify-end"
              >
                {/* Icon centered above first bar (leftmost) */}
                <div
                  className="mb-3 flex h-[42px] shrink-0 items-center justify-center flex-1"
                  style={{ width: BAR_WIDTH }}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                </div>

                {/* Bars */}
                <div
                  className="flex w-full items-end justify-center flex-1 mt-auto"
                  style={{
                    height:
                      idx === 0
                        ? 20
                        : idx === 1
                          ? 50
                          : idx === 2
                            ? 100
                            : MAX_BAR_HEIGHT,
                  }}
                >
                  <div className="flex items-end flex-1 justify-center gap-2 overflow-hidden rounded-t-[10px]">
                    {item.bars.map((bar, barIndex) => {
                      const isFirst = barIndex === 0;
                      const isLast = barIndex === item.bars.length - 1;
                      const barStyle =
                        bar.color === "dark"
                          ? { backgroundColor: "#003859" }
                          : bar.color === "gradient"
                            ? {
                                background:
                                  "linear-gradient(180deg, #00A3E0 0%, #003859 100%)",
                                boxShadow: "0 0 5.2px rgba(0, 135, 215, 0.4)",
                              }
                            : { backgroundColor: "#BAE6FD" };

                      return (
                        <div
                          key={barIndex}
                          className="shrink-0"
                          style={{
                            width: BAR_WIDTH,
                            height: bar.height,
                            ...barStyle,
                            borderTopLeftRadius: BORDER_RADIUS,
                            borderTopRightRadius: BORDER_RADIUS,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Vertical connector - 21px, aligned under first bar */}

                {/* Label - 15px bold, aligned under first bar */}
                <p className="flex  flex-col mt-4 h-[100px] text-left font-jakarta text-[15px] font-bold leading-[1.2] text-[#003859]">
                  {/* <div
                style={{
                  backgroundColor: "#003859",
                }}
                className="h-[20px] w-[3px] text-center ms-15 flex items-center justify-center"
              /> */}
                  <span className={` ${idx === 3 ? "text-center" : ""}`}>
                    {item.label}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionVideoSeparator
        direction="bottom"
        transform="rotateX(180deg)"
        videoSrc="/videos/wave.mp4"
      />
    </>
  );
}
