import Image from "next/image";
import type { PartnersHowItWorksData } from "@/data/partners-how-it-works";

interface PartnersHowItWorksSectionProps {
  data: PartnersHowItWorksData;
}

// Isometric cube path block
function PathCube({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={66}
      viewBox="0 0 64 66"
      fill="none"
      style={style}
    >
      <path
        d="M41.5522 50.4889L64 37.3542L63.8879 51.9594L41.5522 65.0561L41.5522 50.4889Z"
        fill="#02A1FF"
      />
      <path
        d="M0 26.3711L41.5522 50.4905L41.5522 65.1673L-3.26183e-07 41.1771L0 26.3711Z"
        fill="#006DAD"
      />
      <path
        d="M22.9254 13.236L64 37.3562L41.5522 50.4905L-5.80968e-07 26.3711L22.9254 13.236Z"
        fill="#0087D7"
      />
    </svg>
  );
}

export default function PartnersHowItWorksSection({
  data,
}: PartnersHowItWorksSectionProps) {
  const { badge, heading, steps } = data;

  return (
    <section className="relative z-10 w-full overflow-hidden bg-white px-6 py-16 lg:px-[7vw] lg:py-24 lg:pb-40">
      <div className="relative mx-auto max-w-[1252px]">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center gap-2">
          <div
            className="rounded-full border px-5 py-1.5"
            style={{
              backgroundColor: "#F0F6F9",
              borderColor: "rgba(0, 56, 89, 0.1)",
              height: 32,
            }}
          >
            <p className="font-jakarta text-[12px] font-bold leading-[18px] tracking-[0.84px] text-[#003859]">
              {badge}
            </p>
          </div>
          <h2 className="max-w-[872px] px-8 text-center font-jakarta text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-1.05px] text-[#003859]">
            {heading.line1}
            <span className="text-[#0087D7]">{heading.line2}</span>
            {heading.line3}
          </h2>
        </div>

        {/* Desktop:   */}
        <div className="relative hidden min-h-[1050px] lg:block">
          {/* Path cubes - S-shape, hidden on mobile */}
          <div className="absolute inset-0 hidden lg:block" aria-hidden>
            <div style={{ position: "absolute", left: "43%", top: "21%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "47%", top: "25%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "51%", top: "29%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "55%", top: "33%" }}>
              <PathCube />
            </div>
            {/* <div style={{ position: "absolute", left: "54%", top: "38%" }}>
              <PathCube />
            </div> */}
            <div style={{ position: "absolute", left: "52%", top: "44%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "48%", top: "48%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "43%", top: "52%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "40%", top: "56%" }}>
              <PathCube />
            </div>
            <div style={{ position: "absolute", left: "38%", top: "60%" }}>
              <PathCube />
            </div>
            {/* <div style={{ position: "absolute", left: "40%", top: "68%" }}>
              <PathCube />
            </div> */}
            <div
              style={{
                position: "absolute",
                left: "38%",
                top: "73%",
                transform: "rotateY(180deg)",
              }}
            >
              <PathCube />
            </div>
            <div
              style={{
                position: "absolute",
                left: "35%",
                top: "78%",
                transform: "rotateY(180deg)",
              }}
            >
              <PathCube />
            </div>
            <div
              style={{
                position: "absolute",
                left: "32%",
                top: "83%",
                transform: "rotateY(180deg)",
              }}
            >
              <PathCube />
            </div>
          </div>

          {/* Step 1 - top-left */}
          <div className="absolute left-0 top-0 w-full max-w-[350px] lg:left-[10%] lg:top-[12%]">
            <div className="flex flex-col gap-1 text-right">
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[0].label}
              </p>
              <h3 className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[0].title}
              </h3>
              <p className="font-jakarta pe-10 text-[14px] font-normal leading-[25.2px] text-[#52697A]">
                {steps[0].description}
              </p>
            </div>
          </div>
          <div className="absolute left-1/2 top-[15%] flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:left-[42%]">
            <div className="flex  items-center justify-center  ">
              <Image
                src={steps[0].icon}
                alt="check icon"
                width={70}
                height={70}
                className="object-contain w-[70px] h-[70px] relative z-10"
              />
              <div
                className="absolute top-12 left-0 z-0"
                style={{
                  background: "url(/images/icons/under-cover.svg)",
                  width: "100px",
                  height: "100px",
                  // transform: "rotate(-45deg)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  className="object-contain relative left-1/2 -translate-x-1/2 z-10 mt-4"
                  src="/images/icons/dot.svg"
                  alt="under cover"
                  width={55}
                  height={70}
                  style={{
                    width: "55px",
                    height: "70px",
                    // transform: "rotate(-53.066deg)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 2 - mid-right */}
          <div className="absolute right-0 top-0 w-full max-w-[350px] lg:right-[8%] lg:top-[38%]">
            <div className="flex flex-col gap-1 text-left">
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[1].label}
              </p>
              <h3 className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[1].title}
              </h3>
              <p className="font-jakarta ps-10 text-[14px] font-normal leading-[25.2px] text-[#52697A]">
                {steps[1].description}
              </p>
            </div>
          </div>
          <div className="absolute left-[1/2] top-[40%] flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:left-[61%]">
            <div className="flex  items-center justify-center  ">
              <Image
                src={steps[1].icon}
                alt="check icon"
                width={70}
                height={70}
                className="object-contain w-[70px] h-[70px] relative z-10"
              />
              <div
                className="absolute top-12 left-0 z-0"
                style={{
                  background: "url(/images/icons/under-cover.svg)",
                  width: "100px",
                  height: "100px",
                  // transform: "rotate(-45deg)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  className="object-contain relative left-1/2 -translate-x-1/2 z-10 mt-4"
                  src="/images/icons/dot.svg"
                  alt="under cover"
                  width={55}
                  height={70}
                  style={{
                    width: "55px",
                    height: "70px",
                    // transform: "rotate(-53.066deg)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 3 - mid-left */}
          <div className="absolute left-0 top-0 w-full max-w-[350px] lg:left-[8%] lg:top-[64%]">
            <div className="flex flex-col gap-1 text-right">
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[2].label}
              </p>
              <h3 className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[2].title}
              </h3>
              <p className="font-jakarta pe-10 text-[14px] font-normal leading-[25.2px] text-[#52697A]">
                {steps[2].description}
              </p>
            </div>
          </div>
          <div className="absolute left-1/2 top-[66%] flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:left-[42%]">
            <div className="flex  items-center justify-center  ">
              <Image
                src={steps[2].icon}
                alt="check icon"
                width={70}
                height={70}
                className="object-contain w-[70px] h-[70px] relative z-10"
              />
              <div
                className="absolute top-12 left-0 z-0"
                style={{
                  background: "url(/images/icons/under-cover.svg)",
                  width: "100px",
                  height: "100px",
                  // transform: "rotate(-45deg)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  className="object-contain relative left-1/2 -translate-x-1/2 z-10 mt-4"
                  src="/images/icons/dot.svg"
                  alt="under cover"
                  width={55}
                  height={70}
                  style={{
                    width: "55px",
                    height: "70px",
                    // transform: "rotate(-53.066deg)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 4 - bottom-right */}
          <div className="absolute left-0 top-0 w-full max-w-[350px] lg:left-[0%] lg:top-[88%]">
            <div className="flex flex-col gap-1 text-right">
              <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                {steps[3].label}
              </p>
              <h3 className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                {steps[3].title}
              </h3>
              <p className="font-jakarta pe-10 text-[14px] font-normal leading-[25.2px] text-[#52697A]">
                {steps[3].description}
              </p>
            </div>
          </div>
          <div className="absolute left-1/2 top-[90%] flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:left-[32%]">
            <div className="flex  items-center justify-center  ">
              <Image
                src={steps[3].icon}
                alt="check icon"
                width={70}
                height={70}
                className="object-contain w-[70px] h-[70px] relative z-10"
              />
              <div
                className="absolute top-12 left-0 z-0"
                style={{
                  background: "url(/images/icons/under-cover.svg)",
                  width: "100px",
                  height: "100px",
                  // transform: "rotate(-45deg)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Image
                  className="object-contain relative left-1/2 -translate-x-1/2 z-10 mt-4"
                  src="/images/icons/dot.svg"
                  alt="under cover"
                  width={55}
                  height={70}
                  style={{
                    width: "55px",
                    height: "70px",
                    // transform: "rotate(-53.066deg)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="flex flex-col gap-16 lg:hidden">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-6 text-center"
            >
              <div
                className="flex h-[100px] w-[100px] items-center justify-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(186, 230, 253, 0.7) 0%, rgba(186, 230, 253, 0.3) 60%, transparent 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(0, 56, 89, 0.06), 0 4px 20px rgba(0, 56, 89, 0.08)",
                }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #003859 0%, #004A73 100%)",
                    boxShadow: "0 4px 12px rgba(0, 56, 89, 0.3)",
                  }}
                >
                  <div style={{ filter: "brightness(0) invert(1)" }}>
                    <Image
                      src={step.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-jakarta text-[14px] font-bold leading-[15px] tracking-[0.8px] text-[#00A3E0]">
                  {step.label}
                </p>
                <h3 className="font-jakarta text-[20px] font-bold leading-[24px] text-[#003859]">
                  {step.title}
                </h3>
                <p className="font-jakarta text-[14px] font-normal leading-[25.2px] text-[#52697A]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
