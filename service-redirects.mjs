import servicesPageData from "./src/data/services-page.json" with { type: "json" };

const PILLARS = ["offensive", "defensive", "grc", "training"];

const LEGACY_ALIASES = [
  {
    source: "/services/offensive-security",
    destination: "/services/offensive/penetration-testing",
  },
  {
    source: "/services/cis-benchmarks",
    destination: "/services/offensive/cis-benchmarks-assessment",
  },
  {
    source: "/services/ssdlc-training",
    destination: "/services/training/ssdlt-training",
  },
  {
    source: "/services/central-bank-sector-specific-compliance",
    destination: "/services/grc/cbe-compliance",
  },
];

/** Flat `/services/{slug}` → nested `/services/{pillar}/{slug}` for next.config redirects. */
export function getFlatServiceRedirects() {
  const redirects = [];

  for (const pillar of PILLARS) {
    const cards = servicesPageData.categories[pillar]?.cards ?? [];
    for (const card of cards) {
      if (card.link) {
        redirects.push({
          source: `/services/${card.link}`,
          destination: `/services/${pillar}/${card.link}`,
        });
      }
    }
  }

  return [...redirects, ...LEGACY_ALIASES];
}
