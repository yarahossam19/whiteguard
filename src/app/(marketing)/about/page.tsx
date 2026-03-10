import BannerSection from "@/components/about-us/BannerSection";
import { getAboutBannerData } from "@/data/about-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | WHITEGUARD",
  description:
    "Learn about WHITEGUARD - your trusted partner in intelligent security monitoring.",
};

export default function AboutPage() {
  const bannerData = getAboutBannerData();
  return <BannerSection data={bannerData} />;
}
