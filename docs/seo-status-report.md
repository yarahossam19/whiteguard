# WhiteGuard SEO Status Report

**Branch reviewed:** `develop`  
**Audit reference:** WHITEGUARD-SEO-GEO-ULTIMATE-PLAN (WG-01 → WG-15)  
**Last updated:** July 21, 2026  
**Report version:** 2.0 — full revision after WG-06, WG-07, WG-08, WG-15 implementation

---

## Executive Summary | الملخص

| Status | Count | Items |
|--------|-------|--------|
| **Fixed / mostly fixed** | 11 | WG-02, 03, 04, 05, 06, 07, 12, 15 + partial 01, 08, 14 |
| **Partially fixed** | 2 | WG-01, 10 |
| **Still open** | 2 | WG-09, 11 |
| **Ongoing / QA** | 1 | WG-13 |

### Progress vs original audit (~40/100 baseline)

| Area | Before | Now |
|------|--------|-----|
| Crawlability & index hygiene | Critical gaps | **Strong** — no crawl trap, 410 placeholders, SSR services |
| Metadata & canonicals | Partial | **Strong** — shared helper, homepage title, per-page canonicals |
| Structured data (JSON-LD) | None | **Implemented** — Organization, Service, Article, BreadcrumbList |
| Brand consistency | Fragmented | **Mostly aligned** — core paths + service SEO; JSON/legal remainder |
| Security headers | None | **Core headers live** — CSP deferred |
| Content / marketing pages | Thin | **Unchanged** — marketing track still open |

### What shipped in this revision | ما تم في هذا التحديث

- **WG-06** — Homepage title, About meta, `service-details.json` brand in SEO copy
- **WG-07** — JSON-LD: Organization (global), Service + Breadcrumb (service details), Article + Breadcrumb (resources)
- **WG-08** — `site.ts`, footer, hero, About banner **64+**, service SEO titles
- **WG-15** — Security headers in `next.config.ts` (no CSP yet)

---

## Scorecard | جدول WG-01 → WG-15

| ID | Topic | Status | Notes |
|----|-------|--------|-------|
| WG-01 | Canonical / www | **Partial** | Code ready; live CDN/nginx verify pending |
| WG-02 | Crawl trap | **Fixed** | Unknown resources → 404 |
| WG-03 | Placeholders | **Fixed** | IDs 1–12 → 410; 3 real articles live |
| WG-04 | Service tabs SSR | **Fixed** | Pillar routes + nested detail URLs |
| WG-05 | Sitemap | **Mostly fixed** | Dynamic sitemap; blog URLs not included yet |
| WG-06 | Metadata / titles | **Fixed** | Homepage + About + service SEO normalized |
| WG-07 | JSON-LD schema | **Fixed** | Org, Service, Article, BreadcrumbList |
| WG-08 | Brand consistency | **Mostly fixed** | Core site paths; JSON/legal remainder |
| WG-09 | Contact / email | **Open** | `.co.uk` email vs `.io` domain |
| WG-10 | Industries tabs | **Partial** | 3 SSR subpages; hub still client tabs |
| WG-11 | Content / marketing | **Open** | Case studies, SOC, geo pages — marketing |
| WG-12 | Open Graph | **Mostly fixed** | Default OG; per-resource images optional |
| WG-13 | Accessibility | **Ongoing** | ~94 Lighthouse; systematic QA pending |
| WG-14 | Performance | **Partial** | Hero LCP improved; large assets remain |
| WG-15 | Security headers | **Mostly fixed** | Core headers; CSP deferred |

---

## WG-01 — No Canonical + www / non-www

**Status:** Partially fixed | **جزئي**

### What’s done | ما تم

- `metadataBase` + `canonicalUrl()` in `src/lib/metadata.ts`
- `buildPageMetadata()` adds `<link rel="canonical">` on most pages
- www → apex redirect in `next.config.ts` (host rule for `www.whiteguard.io`)

### What’s missing | ما زال ناقص

- www → apex redirect must be **confirmed on Cloudflare/nginx** (code alone is not enough)
- Not verified live in production HTML after latest deploy

### How to finish | كيف تكمل

1. Confirm `https://www.whiteguard.io` → `https://whiteguard.io` (301) in DNS/CDN
2. `curl -I https://whiteguard.io/` and inspect canonical in page source

---

## WG-02 — Unlimited Dynamic Route (Crawl Trap)

**Status:** Fixed | **تم الحل**

### What’s done

- `getResourceDetail()` returns `null` for unknown IDs — no default fallback content
- `dynamicParams = false` on `src/app/(marketing)/resources/[id]/page.tsx`
- Unknown IDs → `notFound()` (404)

### Verification

- `/resources/999` → **404**
- Only published slugs return **200**

---

## WG-03 — Placeholder Resources

**Status:** Fixed (technical + content) | **تم**

### What’s done

- Old numeric IDs `1–12` → **410 Gone** via `src/middleware.ts`
- **3 real articles** with descriptive slugs in `src/data/resources.json`
- Placeholders excluded from `generateStaticParams()`
- Published articles have `datePublished` + `author` in `resource-details.json` (for Article schema)

### Optional follow-up

- Add the 3 published resource URLs to `src/app/sitemap.ts`

---

## WG-04 — Service Tabs Client-Side Only

**Status:** Fixed | **تم الحل**

### What’s done

- `/services` redirects to `/services/offensive`
- SSR routes: `/services/offensive`, `/defensive`, `/grc`, `/training`
- Legacy `?tab=` URLs → **301** in `next.config.ts`
- Nested detail URLs: `/services/{pillar}/{slug}`

### Verification

View source on `/services/grc` — GRC content in initial HTML.

---

## WG-05 — Sitemap

**Status:** Mostly fixed | **معظمها تم**

### What’s done

- Dynamic `src/app/sitemap.ts` replaces static `public/sitemap.xml`
- Includes: static pages, service pillars, all service detail pages, 3 industry subpages
- No `?tab=` params, no placeholder resources

### What’s missing

- Published blog/resource URLs (`/resources/{slug}`) not in sitemap yet
- `lastModified: new Date()` on every build (weak freshness signal)

### How to finish

```ts
// src/app/sitemap.ts — add:
import { getPublishedResourceIds } from "@/data/resource-details";

const resourceEntries = getPublishedResourceIds().map((id) =>
  sitemapEntry(`/resources/${id}`, { priority: 0.7, changeFrequency: "monthly" }),
);
```

Use real `datePublished` from `resource-details.json` for `lastModified` when possible.

---

## WG-06 — Metadata / Homepage Title

**Status:** Fixed | **تم الحل**

### What’s done | ما تم

- Shared `buildPageMetadata()` + `resolvePageTitle()` across pages
- **Homepage title:** `Managed Cybersecurity Services in MENA | WhiteGuard` (`src/app/(marketing)/page.tsx`)
- **About description:** uses **WhiteGuard** (`src/app/(marketing)/about/page.tsx`)
- **Services hub title:** *Cybersecurity Services for MENA Enterprises | WhiteGuard*
- **`service-details.json`:** all **101** legacy `Whiteguard` → **WhiteGuard**

### Optional follow-up

- Normalize remaining `Whiteguard` in testimonials, partners, industries JSON, legal pages
- Tune titles on contact, partners, become-a-partner for keyword coverage

---

## WG-07 — Schema (JSON-LD)

**Status:** Fixed | **تم الحل**

### Architecture | البنية

```
src/data/organization.ts     → verified business facts (single source)
src/lib/schema.ts            → buildOrganizationSchema, buildServiceSchema, buildArticleSchema, buildBreadcrumbSchema, toSchemaGraph
src/components/seo/JsonLd.tsx → <script type="application/ld+json">
```

### What’s implemented | ما تم

| Schema type | Where | File |
|-------------|-------|------|
| **Organization** | Every page | `src/app/layout.tsx` |
| **Service** | Service detail pages | `src/app/(marketing)/services/[pillar]/[slug]/page.tsx` |
| **Article** | Published resources | `src/app/(marketing)/resources/[id]/page.tsx` |
| **WebSite** + **SearchAction** | Homepage only | `src/app/(marketing)/page.tsx` |
| **Site search** | `/search?q=` (powers SearchAction) | `src/app/(marketing)/search/page.tsx`, `src/lib/site-search.ts` |

### Organization facts (verified from contact / site config)

| Field | Value |
|-------|--------|
| Name | WhiteGuard |
| Legal name | WhiteGuard LLC |
| URL | `https://whiteguard.io` |
| Email | `sales@whiteguard.co.uk` |
| Address | 4 Khan Younis, Mit Aqaba, Agouza District, Giza Governorate, EG |
| Logo | `/images/logo-icon.png` |
| sameAs | LinkedIn, Facebook, X (from `src/config/site.ts`) |

**Note:** `telephone` is intentionally **omitted** from Organization schema (commented in `organization.ts` / `schema.ts`) even though the contact page displays `+44 1227391144`. Uncomment only after leadership confirms public listing in schema.

### Service schema

- Links to Organization via `@id: https://whiteguard.io/#organization`
- `areaServed`: MENA
- Name + description from service detail SEO / hero data

### Article schema

- `headline`, `description`, `image`, `datePublished`, `author`, `publisher`
- Dates in `resource-details.json`:
  - `how-to-know-your-system-isnt-secure` → 2026-01-20
  - `why-penetration-testing-matters` → 2026-02-05
  - `assumed-security-vs-verified-security` → 2026-02-20

### Breadcrumb examples

- **Service:** Home → Services → {Pillar} → {Service name}
- **Resource:** Home → Resources → {Article title}

### Optional follow-up

- BreadcrumbList on industry subpages and service pillar hubs
- ~~`WebSite` + `SearchAction` schema on homepage~~ ✅ Done — `/search?q=` endpoint
- Add `telephone` to Organization schema when approved
- Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) after deploy

---

## WG-08 — Brand Consistency

**Status:** Mostly fixed | **معظمها تم**

### Fixed | ما تم

| Location | Value |
|----------|--------|
| `src/lib/metadata.ts` | `SITE_NAME = "WhiteGuard"` |
| `src/config/site.ts` | `name: "WhiteGuard"`, copyright **© 2026 WhiteGuard LLC** |
| Footer | Uses `siteConfig` → **WhiteGuard LLC** |
| Homepage meta | **64+ MENA enterprises** |
| About banner | **64+ MENA Enterprises** (aligned with homepage) |
| `service-details.json` | All `\| WhiteGuard` suffixes |
| `hero.json` | Hero copy → **WhiteGuard** |
| JSON-LD | Organization name → **WhiteGuard** |

### Still inconsistent | ما زال ناقص

| Location | Issue |
|----------|--------|
| `testimonials-section.json`, `partners-*.json`, `industries-*.json` | Legacy `"Whiteguard"` in body copy |
| `privacy-policy`, `terms-of-service` pages | `"Whiteguard"` in legal text |
| `src/components/ui/site.ts` | Stale duplicate config (unused) |
| Social handles | `@WhiteguardLTD`, `Whiteguard.IO` (external accounts — may stay) |
| Resource article bodies | `info@whiteguard.co.uk` in CTA copy |

### How to finish

- Bulk-replace `Whiteguard` → `WhiteGuard` in remaining JSON + legal pages
- Remove or sync `src/components/ui/site.ts`
- Confirm **64+** is the approved public metric (replaced **200+** on About banner)

---

## WG-09 — Contact / Email Domain

**Status:** Open | **لم يُنفَّذ**

### Current state

| Surface | Value |
|---------|--------|
| Contact page UI | `sales@whiteguard.co.uk`, phone visible |
| Organization JSON-LD | `sales@whiteguard.co.uk`, no telephone |
| Resource article CTAs | `info@whiteguard.co.uk` |
| Canonical domain | `whiteguard.io` |
| API default recipient | `info@whiteguard.co.uk` |

### How to fix

- Leadership decision: official public email (`@whiteguard.io` vs `@whiteguard.co.uk`)
- Align contact UI, JSON-LD, resource CTAs, and API defaults to one primary address
- Add `telephone` to Organization schema when approved for structured data

---

## WG-10 — Industries Tabs

**Status:** Partially fixed | **جزئي**

### Done

- SSR pages: `/industries/healthcare`, `/financial-services`, `/industrial-services`
- All three in `sitemap.ts`

### Missing

- Hub `/industries` uses client-side tabs — crawlers see default tab only
- No dedicated routes for Government, Energy, Insurance, etc.

### How to fix

- Link hub tabs to real routes (Services pattern), or SSR all tab panels in initial HTML
- Add BreadcrumbList JSON-LD on industry subpages

---

## WG-11 — Thin / Missing Content

**Status:** Open (Marketing) | **Marketing — لم يُنفَّذ**

Recommended new pages:

- Customer case studies hub
- Dedicated Managed SOC landing
- Egypt / Saudi Arabia geo pages
- Compliance pillars (NCA-ECC, SAMA-CSF, PDPL, CBE)

**Note:** Service detail pages already provide depth — marketing can enrich without new routes.

---

## WG-12 — Open Graph / Social Previews

**Status:** Mostly fixed | **معظمها تم**

### Done

- Default OG: `public/images/og-default.png` (1200×630)
- `buildPageMetadata()` sets OG + Twitter on most routes

### Gap

- Same default image on all pages
- Resource posts don't pass `detail.heroImage` to OG yet

### How to improve

```ts
// resources/[id]/page.tsx generateMetadata:
return buildPageMetadata({
  path: `/resources/${id}`,
  title: `${detail.title} | WhiteGuard`,
  description: ...,
  image: detail.heroImage, // per-article OG
});
```

---

## WG-13 — Accessibility

**Status:** Ongoing | **مستمر**

- Lighthouse Accessibility ~94
- Decorative images use `alt=""` where appropriate
- Heading order, contrast, duplicate CTA names not systematically audited

### How to fix

Targeted frontend QA pass — separate from SEO engineering track.

---

## WG-14 — Performance (Video / Hero)

**Status:** Partially fixed | **جزئي**

### Done

- Hero: `next/image` + `priority` / `fetchPriority="high"`
- Wave videos → SVG on mobile; desktop lazy via `DesktopWaveVideo.tsx`
- White Hawk video loads on user click

### Remaining

- Blog PNGs in `public/images/resources/` (~1–2 MB each)
- White Hawk source video ~25 MB on disk

### How to improve

- Convert blog images to WebP/AVIF (Next.js `images.formats` already supports AVIF/WebP)
- Host or compress large video assets

---

## WG-15 — Security Headers

**Status:** Mostly fixed | **معظمها تم**

### Implemented in `next.config.ts`

| Header | Value |
|--------|--------|
| `X-Powered-By` | Hidden (`poweredByHeader: false`) |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Content-Type-Options` | `nosniff` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

### Not yet added

- **Content-Security-Policy (CSP)** — deferred to avoid breaking GTM, Smartsupp, Google Maps embed, reCAPTCHA

### How to finish

1. Deploy and verify: `curl -I https://whiteguard.io/`
2. Add CSP in report-only mode first, then enforce
3. HSTS at CDN/nginx layer

---

## Infrastructure Note — 502 Bad Gateway

Production **502** was likely caused by Docker runner missing runtime files required by `next.config.ts`:

- `service-redirects.mjs`
- `src/data/services-page.json`

Fix applied in `Dockerfile` — **confirm deployed** on EC2/GitLab pipeline.

---

## Recommended Next Steps | الخطوات المقترحة

### Phase 1 — Quick wins (engineering)

1. ~~Homepage title (WG-06)~~ ✅
2. Add published resources to sitemap (WG-05)
3. ~~Brand core paths (WG-08)~~ ✅ — bulk JSON/legal cleanup optional
4. Verify www redirect live (WG-01)
5. ~~JSON-LD (WG-07)~~ ✅ — validate with Rich Results Test post-deploy

### Phase 2 — Trust & discoverability

6. Contact email alignment (WG-09)
7. Per-page OG images for resources (WG-12)
8. Add `telephone` to Organization schema if approved (WG-07)

### Phase 3 — Crawl & polish

9. Industries hub → real routes (WG-10)
10. ~~Security headers (WG-15)~~ ✅ core — CSP optional
11. Accessibility QA (WG-13)
12. Bulk brand normalization in remaining JSON + legal pages (WG-08 remainder)
13. BreadcrumbList on industry subpages (WG-07 optional)

### Phase 4 — Marketing (separate track)

14. Case studies, SOC page, compliance/geo content (WG-11)

---

## Key Files Reference

| Area | File(s) |
|------|---------|
| Metadata helper | `src/lib/metadata.ts` |
| JSON-LD builders | `src/lib/schema.ts` |
| Organization facts | `src/data/organization.ts` |
| JsonLd component | `src/components/seo/JsonLd.tsx` |
| Root layout (Organization) | `src/app/layout.tsx` |
| Service detail (Service + Breadcrumb) | `src/app/(marketing)/services/[pillar]/[slug]/page.tsx` |
| Resource detail (Article + Breadcrumb) | `src/app/(marketing)/resources/[id]/page.tsx` |
| Resource article metadata | `src/data/resource-details.json` |
| Homepage metadata | `src/app/(marketing)/page.tsx` |
| About metadata | `src/app/(marketing)/about/page.tsx` |
| Site / footer config | `src/config/site.ts` |
| Service SEO copy | `src/data/service-details.json` |
| About stats | `src/data/about-banner.json` |
| Hero copy | `src/data/hero.json` |
| Security headers | `next.config.ts` |
| Sitemap | `src/app/sitemap.ts` |
| Resources validation | `src/data/resource-details.ts`, `src/middleware.ts` |
| Service routes | `src/app/(marketing)/services/[pillar]/page.tsx` |
| Redirects | `next.config.ts`, `service-redirects.mjs` |
| Robots | `public/robots.txt` |

---

## Changelog | سجل التحديثات

| Date | Version | Changes |
|------|---------|---------|
| Jul 21, 2026 | 1.0 | Initial audit report (post `feat/seo-improvements` merge) |
| Jul 21, 2026 | 1.1 | **WG-06 fixed:** homepage title, About description, `service-details.json` |
| Jul 21, 2026 | 1.2 | **WG-08 mostly fixed:** `site.ts`, footer, hero, About **64+**, service SEO |
| Jul 21, 2026 | 1.3 | **WG-15 mostly fixed:** security headers in `next.config.ts` |
| Jul 21, 2026 | **2.1** | **WebSite + SearchAction** on homepage; `/search` page for site search |

---

*Living report on `develop`. Original audit score (~40/100) is a baseline estimate, not Google Search Console data. Re-validate live after each production deploy.*
