import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ServiceDetailMethodologyProps {
  heading: string;
  subtitle: string;
  steps: Step[];
}

export default function ServiceDetailMethodology({
  heading,
  subtitle,
  steps,
}: ServiceDetailMethodologyProps) {
  return (
    <>
      <SectionVideoSeparator
        direction="top"
        videoSrc="/videos/wave.mp4"
        className="z-[-1]"
      />
      <section
        className="flex w-full flex-col items-center py-16 lg:py-20"
        style={{
          background:
            "linear-gradient(180deg, rgb(171, 225, 255) 0%, rgb(231, 246, 255) 20%, rgb(231, 246, 255) 80%, rgb(171, 224, 255) 100%)",
        }}
      >
        <div className="container flex flex-col items-center">
        <div className="mx-auto flex w-full max-w-[896px] flex-col items-center">
          <div className="mb-12 flex flex-col items-center gap-2 text-center">
            <h2 className="font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
              {heading}
            </h2>
            <p className="font-jakarta text-[16px] font-normal leading-[24px] text-[#52697a]">
              {subtitle}
            </p>
          </div>
          <div className="relative w-full max-w-[848px]">
            {/* Center vertical line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-px bg-[#c2cdd6] lg:block" />
            <div className="flex flex-col pt-30 lg:pt-0 gap-16 lg:gap-4">
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={step.number}
                    className="relative grid min-h-[100px] grid-cols-1 items-center lg:grid-cols-[1fr_40px_1fr] lg:gap-6"
                  >
                    <div
                      className={`flex flex-col gap-1 rounded-[16px] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] ${
                        isLeft
                          ? "lg:text-right lg:col-start-1"
                          : "order-3 text-left lg:order-none lg:col-start-3"
                      }`}
                    >
                      <h3 className="font-jakarta text-[16px] font-normal leading-[24px] text-[#003859]">
                        {step.title}
                      </h3>
                      <p className="font-jakarta text-[14px] font-normal leading-[23.8px] text-[#52697a]">
                        {step.description}
                      </p>
                    </div>
                    <div className="absolute left-1/2 -top-[20px] flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#003859] text-[14px] font-bold text-white shadow-[0px_10px_15px_0px_rgba(0,56,89,0.2),0px_4px_6px_0px_rgba(0,56,89,0.2)] lg:relative lg:left-0 lg:top-0 lg:col-start-2 lg:row-start-1 lg:translate-x-0 lg:translate-y-0">
                      {step.number}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
