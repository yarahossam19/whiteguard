import type { ServicesPageData } from "@/data/services-page";
import { SectionVideoSeparator } from "../ui/SectionVideoSeparator";
import { HoverSwapButton } from "../ui/HoverSwapButton";

type TabId = ServicesPageData["tabs"][number]["id"];
type CategoryKey = keyof ServicesPageData["categories"];

interface ServicesPageHeroProps {
  data: ServicesPageData;
  activeTab: TabId;
}

export default function ServicesPageHero({
  data,
  activeTab,
}: ServicesPageHeroProps) {
  const { categories } = data;
  const categoryKey = activeTab === "all" ? "all" : activeTab;
  const category = categories[categoryKey as CategoryKey];
  const hero = category?.hero ?? categories.offensive.hero;

  return (
    <>
      <section className="relative min-h-[60vh] xl:min-h-screen  pt-16 xl:py-24">
        {/* Background: wave + gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-[calc(50%+200px)] h-[404px] w-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundImage: "url('/images/wave-light-blue-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "endcenter",
            }}
          />
          <div
            className="absolute h-[700px] xl:h-[400px] left-0 right-0 w-full bottom-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #ABE1FF 100%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="container relative z-10 flex flex-col justify-center items-center gap-16 pt-4  ">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="font-jakarta text-[clamp(36px,5vw,72px)] font-bold leading-tight text-[#003859]">
              {hero.heading}
              <br />{" "}
              {"heading2" in hero && hero.heading2 ? (
                <>
                  {hero.heading2}
                  <br />
                </>
              ) : null}
            </h1>
            <h2 className="font-thin italic font-jakarta text-[clamp(36px,5vw,72px)]  leading-tight text-[#003859]">
              {hero.headingAccent}{" "}
              {"headingAccent2" in hero && hero.headingAccent2 ? (
                <>
                  <br />
                  {hero.headingAccent2}{" "}
                </>
              ) : null}
            </h2>
            <p className="lg:max-w-[75%] font-jakarta text-[16px] font-normal leading-[30px] text-[#52697A] xl:text-[18px]">
              {hero.subtitle}
            </p>
          </div>

          {/* CTAs  */}
          <div className="flex flex-wrap items-center justify-center gap-4 pb-24">
            {hero.ctaPrimary.label && (
              <HoverSwapButton
                href={"/contact"}
                label={hero.ctaPrimary.label}
                hoverLabel={hero.ctaPrimary.label}
                variant={"cta"}
                showChevrons={false}
                className={`${hero.ctaSecondary?.label ? "px-6" : "px-12"} py-[14px] text-[clamp(14px,1.1vw,24px)]  font-ano w-full md:w-auto`}
              />
            )}
            {hero.ctaSecondary?.label && (
              <HoverSwapButton
                href={"/contact"}
                label={hero.ctaSecondary.label}
                hoverLabel={hero.ctaSecondary.label}
                variant={"secondary"}
                showChevrons={false}
                className="px-6 py-[14px] text-[clamp(14px,1.1vw,24px)]  font-ano w-full md:w-auto"
              />
            )}
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
