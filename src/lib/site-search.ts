import { getResourcesData } from "@/data/resources";
import {
  getAllServiceCardEntries,
  getServiceDetailPath,
} from "@/data/services-page";

export type SiteSearchResult = {
  title: string;
  description: string;
  href: string;
  type: "service" | "resource" | "page";
};

const STATIC_PAGES: SiteSearchResult[] = [
  {
    title: "About Us",
    description: "Learn about WhiteGuard and our mission in cybersecurity.",
    href: "/about",
    type: "page",
  },
  {
    title: "Contact",
    description: "Get in touch with WhiteGuard for security consultations.",
    href: "/contact",
    type: "page",
  },
  {
    title: "Partners",
    description: "Explore the WhiteGuard partner ecosystem.",
    href: "/partners",
    type: "page",
  },
  {
    title: "Industries",
    description: "Cybersecurity solutions tailored to your industry.",
    href: "/industries",
    type: "page",
  },
  {
    title: "Resources",
    description: "Cybersecurity insights, guides, and blog articles.",
    href: "/resources",
    type: "page",
  },
  {
    title: "Offensive Security",
    description: "Penetration testing, red teaming, and vulnerability assessment.",
    href: "/services/offensive",
    type: "page",
  },
  {
    title: "Defensive Security",
    description: "SOC, SIEM, DFIR, and managed detection services.",
    href: "/services/defensive",
    type: "page",
  },
  {
    title: "GRC & Compliance",
    description: "ISO 27001, SAMA, NCA, PCI-DSS, and governance services.",
    href: "/services/grc",
    type: "page",
  },
  {
    title: "Cybersecurity Awareness Training",
    description: "Security awareness and technical training programs.",
    href: "/services/training",
    type: "page",
  },
];

function matchesQuery(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query.toLowerCase());
}

/** Simple in-memory search over services, resources, and key static pages. */
export function searchSite(query: string): SiteSearchResult[] {
  const q = query.trim();
  if (q.length < 2) return [];

  const results: SiteSearchResult[] = [];
  const seen = new Set<string>();

  function add(result: SiteSearchResult) {
    if (seen.has(result.href)) return;
    seen.add(result.href);
    results.push(result);
  }

  for (const { pillar, link, card } of getAllServiceCardEntries()) {
    const haystack = `${card.title} ${card.description ?? ""}`;
    if (matchesQuery(haystack, q)) {
      add({
        title: card.title,
        description: card.description ?? "",
        href: getServiceDetailPath(link) ?? `/services/${pillar}/${link}`,
        type: "service",
      });
    }
  }

  for (const item of getResourcesData().items) {
    const haystack = `${item.title} ${item.description}`;
    if (matchesQuery(haystack, q)) {
      add({
        title: item.title,
        description: item.description,
        href: item.href,
        type: "resource",
      });
    }
  }

  for (const page of STATIC_PAGES) {
    const haystack = `${page.title} ${page.description}`;
    if (matchesQuery(haystack, q)) {
      add(page);
    }
  }

  return results;
}
