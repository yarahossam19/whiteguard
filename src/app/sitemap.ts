import type { MetadataRoute } from "next";
import { getAllServiceCardEntries } from "@/data/services-page";
import { SITE_URL } from "@/lib/metadata";
import {
  SERVICE_PILLAR_TABS,
  servicePillarPath,
} from "@/lib/services-pillar-tabs";

type SitemapEntry = MetadataRoute.Sitemap[number];

function sitemapEntry(
  path: string,
  options: Pick<SitemapEntry, "priority" | "changeFrequency"> = {
    priority: 0.8,
    changeFrequency: "monthly",
  },
): SitemapEntry {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;

  return {
    url,
    lastModified: new Date(),
    ...options,
  };
}

const staticPages: Array<{
  path: string;
  priority?: number;
  changeFrequency?: SitemapEntry["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/contact" },
  { path: "/services" },
  { path: "/industries" },
  { path: "/about" },
  { path: "/partners" },
  { path: "/resources" },
  { path: "/become-a-partner", priority: 0.64 },
  { path: "/white-hawk", priority: 0.64 },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.5, changeFrequency: "yearly" },
];

const industryPages = [
  "/industries/healthcare",
  "/industries/financial-services",
  "/industries/industrial-services",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map(({ path, priority, changeFrequency }) =>
    sitemapEntry(path, {
      priority: priority ?? 0.8,
      changeFrequency: changeFrequency ?? "monthly",
    }),
  );

  const industryEntries = industryPages.map((path) =>
    sitemapEntry(path, { priority: 0.8, changeFrequency: "monthly" }),
  );

  const pillarEntries = SERVICE_PILLAR_TABS.map((tab) =>
    sitemapEntry(servicePillarPath(tab), {
      priority: 0.8,
      changeFrequency: "monthly",
    }),
  );

  const serviceEntries = getAllServiceCardEntries().map(({ pillar, link }) =>
    sitemapEntry(`/services/${pillar}/${link}`, {
      priority: 0.64,
      changeFrequency: "monthly",
    }),
  );

  return [...staticEntries, ...pillarEntries, ...industryEntries, ...serviceEntries];
}
