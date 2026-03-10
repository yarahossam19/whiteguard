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
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";
export const metadata: Metadata = {
  title: "Home",
  description:
    "WHITEGUARD provides a new era of cybersecurity — visualized, simplified, and under your control. MENA-rooted, globally proven.",
  openGraph: {
    title: "WHITEGUARD | Cybersecurity Simplified. Protection Amplified.",
    description:
      "WHITEGUARD provides a new era of cybersecurity — visualized, simplified, and under your control.",
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

  return (
    <>
      <HeroSection data={heroData} />
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
