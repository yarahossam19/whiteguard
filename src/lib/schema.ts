import { organizationFacts, ORGANIZATION_ID, SITE_SEARCH_URL, WEBSITE_ID } from "@/data/organization";
import { SITE_NAME, SITE_URL, canonicalUrl } from "@/lib/metadata";

type BreadcrumbItem = {
  name: string;
  path: string;
};

function absoluteAssetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: organizationFacts.name,
    legalName: organizationFacts.legalName,
    url: organizationFacts.url,
    logo: absoluteAssetUrl(organizationFacts.logoPath),
    email: organizationFacts.email,
    // telephone: organizationFacts.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: organizationFacts.address.streetAddress,
      addressLocality: organizationFacts.address.addressLocality,
      addressCountry: organizationFacts.address.addressCountry,
    },
    sameAs: [...organizationFacts.sameAs],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_SEARCH_URL}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: canonicalUrl(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "Place",
      name: "Middle East and North Africa (MENA)",
    },
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
  authorName = SITE_NAME,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: absoluteAssetUrl(image),
    datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteAssetUrl(organizationFacts.logoPath),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(path),
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/** Merge multiple schema objects into one JSON-LD @graph payload. */
export function toSchemaGraph(
  ...schemas: Record<string, unknown>[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _ctx, ...rest }) => rest),
  };
}
