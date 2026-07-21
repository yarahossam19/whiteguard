import { SITE_URL } from "@/lib/metadata";
import { socialLinks } from "@/config/site";

/** Stable @id for cross-referencing Organization from Service / Article schemas. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Stable @id for WebSite schema on the homepage. */
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** URL template for site search (must match `src/app/(marketing)/search/page.tsx`). */
export const SITE_SEARCH_URL = `${SITE_URL}/search`;

/**
 * Verified public business facts — mirrored from the contact page and site config.
 * Update here only when contact/legal copy changes.
 */
export const organizationFacts = {
  name: "WhiteGuard",
  legalName: "WhiteGuard LLC",
  url: SITE_URL,
  logoPath: "/images/logo-icon.png",
  email: "sales@whiteguard.co.uk",
  // telephone: "+44 1227391144",
  address: {
    streetAddress: "4 Khan Younis, Mit Aqaba, Agouza District",
    addressLocality: "Giza Governorate",
    addressCountry: "EG",
  },
  sameAs: socialLinks.map((link) => link.href),
} as const;
