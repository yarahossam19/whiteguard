import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import MenaGloballySection from "@/components/home/MenaGloballySection";
import ServicesSection from "@/components/home/ServicesSection";
import WhiteHawkSection from "@/components/home/WhiteHawkSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { getHeroData } from "@/data/hero";
import { getMenaGloballyData } from "@/data/mena-globally";
import { getServicesSectionData } from "@/data/services-section";
import { getWhiteHawkSectionData } from "@/data/white-hawk-section";
import { getWhyChooseUsSectionData } from "@/data/why-choose-us-section";
import { getTestimonialsSectionData } from "@/data/testimonials-section";
import { getCtaSectionData } from "@/data/cta-section";
import { getClientLogosData } from "@/data/client-logos";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";

const HOME_META_TITLE = "WhiteGuard";
const HOME_META_DESCRIPTION =
  "WhiteGuard is the cybersecurity company protecting 64+ MENA enterprises — managed security services, 24/7 SOC, SAMA, CBE & ISO 27001 ready.";

export const metadata: Metadata = {
  title: { absolute: HOME_META_TITLE },
  description: HOME_META_DESCRIPTION,
  openGraph: {
    title: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_META_TITLE,
    description: HOME_META_DESCRIPTION,
  },
};

export default function HomePage() {
  const heroData = getHeroData();
  const menaGloballyData = getMenaGloballyData();
  const servicesSectionData = getServicesSectionData();
  const whiteHawkSectionData = getWhiteHawkSectionData();
  const whyChooseUsSectionData = getWhyChooseUsSectionData();
  const testimonialsSectionData = getTestimonialsSectionData();
  const ctaSectionData = getCtaSectionData();
  const clientLogosData = getClientLogosData();

  return (
    <>
      <HeroSection data={heroData} logos={clientLogosData} />
      <MenaGloballySection data={menaGloballyData} />
      <ServicesSection data={servicesSectionData} />
      <WhiteHawkSection data={whiteHawkSectionData} />
      <WhyChooseUsSection data={whyChooseUsSectionData} />
      <SectionImageSeparator
        direction="top"
        imageSrc="/images/wave-light-blue.svg"
        height={120}
      />
      <TestimonialsSection data={testimonialsSectionData} />
      <CTASection data={ctaSectionData} />
    </>
  );
}
