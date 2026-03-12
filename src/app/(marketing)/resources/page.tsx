import type { Metadata } from "next";
import ResourcesHeroSection from "@/components/resources/ResourcesHeroSection";
import ResourcesListingSection from "@/components/resources/ResourcesListingSection";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";
import { getResourcesData } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources | WHITEGUARD",
  description:
    "Security resources, guides, and documentation. Explore expert insights, practical tools, and proven strategies.",
};

export default function ResourcesPage() {
  const data = getResourcesData();

  return (
    <div className="bg-white">
      <ResourcesHeroSection
        headline={data.hero.headline}
        subtitle={data.hero.subtitle}
      />

      <div className="pt-0">
        <ResourcesListingSection data={data} />
      </div>
    </div>
  );
}
