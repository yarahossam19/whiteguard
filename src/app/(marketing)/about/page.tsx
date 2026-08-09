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
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About Us",
  description:
    "Discover WhiteGuard — a MENA cybersecurity leader protecting 64+ enterprises with managed security, 24/7 SOC, and compliance-ready services. Meet our team, mission, and milestones.",
});

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
