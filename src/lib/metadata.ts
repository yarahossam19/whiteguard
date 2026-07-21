import type { Metadata } from "next";

/** Canonical production origin (apex). Used for metadataBase and canonical URLs. */
export const SITE_URL = "https://whiteguard.io";

/** Display brand name for titles, OG, and Twitter. */
export const SITE_NAME = "WhiteGuard";

/** Default Open Graph / Twitter share image (1200×630). */
export const DEFAULT_OG_IMAGE = "/images/og-default.png";

export const metadataBase = new URL(SITE_URL);

const BRAND_TITLE_SUFFIX = new RegExp(`\\|\\s*${SITE_NAME}\\s*$`, "i");
const LEGACY_BRAND_TITLE_SUFFIX = /\|\s*Whiteguard\s*$/i;

export type BuildPageMetadataInput = {
  path: string;
  title: string | { absolute: string };
  description?: string;
  /** Override default OG/Twitter image (path or absolute URL). */
  image?: string;
  robots?: Metadata["robots"];
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  alternates?: Metadata["alternates"];
};

/** Absolute canonical URL for a site path (e.g. `/about` → `https://whiteguard.io/about`). */
export function canonicalUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
}

/** Merge page metadata with a path-based canonical URL. */
export function withCanonical(path: string, metadata: Metadata = {}): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: canonicalUrl(path),
    },
  };
}

function normalizeBrandSuffix(title: string): string {
  return title
    .replace(LEGACY_BRAND_TITLE_SUFFIX, `| ${SITE_NAME}`)
    .replace(BRAND_TITLE_SUFFIX, `| ${SITE_NAME}`)
    .trim();
}

function titleAlreadyHasBrand(title: string): boolean {
  return (
    BRAND_TITLE_SUFFIX.test(title) || LEGACY_BRAND_TITLE_SUFFIX.test(title)
  );
}

/**
 * Resolve a page title for Next.js metadata.
 * - Trims trailing whitespace
 * - Uses `absolute` when the title already includes `| WhiteGuard` (avoids duplication with the root template)
 * - Normalizes legacy `| WhiteGuard` → `| WhiteGuard`
 */
export function resolvePageTitle(
  title: string | { absolute: string },
): Metadata["title"] {
  if (typeof title === "object" && title !== null && "absolute" in title) {
    return { absolute: normalizeBrandSuffix(title.absolute) };
  }

  const trimmed = title.trim();
  if (titleAlreadyHasBrand(trimmed)) {
    return { absolute: normalizeBrandSuffix(trimmed) };
  }

  return trimmed;
}

function displayTitleFromResolved(resolved: Metadata["title"]): string {
  if (typeof resolved === "string") {
    return `${resolved} | ${SITE_NAME}`;
  }
  if (resolved && typeof resolved === "object" && "absolute" in resolved) {
    return resolved.absolute ?? SITE_NAME;
  }
  if (resolved && typeof resolved === "object" && "default" in resolved) {
    return resolved.default ?? SITE_NAME;
  }
  return SITE_NAME;
}

/**
 * Shared page metadata builder: canonical URL, title handling, default OG/Twitter card + image.
 */
export function buildPageMetadata({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  robots,
  openGraph,
  twitter,
  alternates,
}: BuildPageMetadataInput): Metadata {
  const resolvedTitle = resolvePageTitle(title);
  const ogTitle = displayTitleFromResolved(resolvedTitle);
  const url = canonicalUrl(path);
  const imageUrl = image;

  const baseOpenGraph: Metadata["openGraph"] = {
    title: ogTitle,
    description,
    url,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  };

  const baseTwitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: [imageUrl],
  };

  return withCanonical(path, {
    title: resolvedTitle,
    description,
    robots,
    alternates,
    openGraph: {
      ...baseOpenGraph,
      ...(typeof openGraph === "object" && openGraph !== null ? openGraph : {}),
      images:
        openGraph &&
        typeof openGraph === "object" &&
        "images" in openGraph &&
        openGraph.images
          ? openGraph.images
          : baseOpenGraph.images,
    },
    twitter: {
      ...baseTwitter,
      ...(typeof twitter === "object" && twitter !== null ? twitter : {}),
      images:
        twitter &&
        typeof twitter === "object" &&
        "images" in twitter &&
        twitter.images
          ? twitter.images
          : baseTwitter.images,
    },
  });
}
