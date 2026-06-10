import BannerSection from "@/components/about-us/BannerSection";
import MilestonesSection from "@/components/about-us/MilestonesSection";
import MissionSection from "@/components/about-us/MissionSection";
import TeamSection from "@/components/about-us/TeamSection";
import CTASection from "@/components/home/CTASection";
import { getAboutBannerData } from "@/data/about-banner";
import { getAboutMilestonesData } from "@/data/about-milestones";
import { getAboutMissionData } from "@/data/about-mission";
import { getAboutTeamData } from "@/data/about-team";
import { getCtaSectionData } from "@/data/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us  ",
  description:
    "Learn about WHITEGUARD - your trusted partner in intelligent security monitoring.",
};

export default function AboutPage() {
  const bannerData = getAboutBannerData();
  const missionData = getAboutMissionData();
  const teamData = getAboutTeamData();
  const milestonesData = getAboutMilestonesData();
  const ctaData = getCtaSectionData();

  return (
    <>
      <BannerSection data={bannerData} />
      <MissionSection data={missionData} />
      <TeamSection data={teamData} />
      <MilestonesSection data={milestonesData} />
      <CTASection data={ctaData} />
    </>
  );
}
