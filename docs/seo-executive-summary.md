# WhiteGuard SEO — Executive Brief

**Date:** 21 July 2026 · **Site:** whiteguard.io

---

## ✅ Done (Engineering)

- **Crawl fixes** — removed placeholder blog trap; fake pages return 404/410; only 3 real articles indexed
- **Service pages** — each category + service has its own Google-friendly URL (SSR, not hidden tabs)
- **Sitemap** — auto-generated for all services, industries, and main pages
- **Homepage title** — descriptive SEO title (not just “WhiteGuard”)
- **Metadata** — canonical URLs, Open Graph/Twitter cards, default share image
- **JSON-LD** — Organization (site-wide), Service + Breadcrumbs (service pages), Article + Breadcrumbs (blogs), WebSite + SearchAction (homepage)
- **Brand (core)** — WhiteGuard spelling on homepage, About, footer, hero, all service SEO copy
- **Metric aligned** — **64+ MENA enterprises** on homepage + About banner
- **Security headers** — X-Frame-Options, Referrer-Policy, nosniff, Permissions-Policy
- **robots.txt** + site search page (`/search`)

---

## ❌ Not done — why & waiting on

| Item | Why not done | Waiting on |
|------|--------------|------------|
| **Official email alignment** | `.io` domain but contact uses `sales@whiteguard.co.uk`; articles use `info@whiteguard.co.uk` | **Management** — pick primary public email |
| **Phone in Google schema** | Omitted from structured data on purpose | **Management** — approve listing `+44 1227391144` |
| **Client count sign-off** | Dev standardized **64+** (About previously showed 200+) | **Management / Marketing** — confirm approved number |
| **Brand cleanup (rest of site)** | Testimonials, partners, legal pages still say “Whiteguard” | **Marketing** — approve bulk update or send corrected copy |
| **Blog publish dates** | Placeholder dates in schema (Jan–Feb 2026) | **Marketing** — real publish dates for 3 articles |
| **More blog content** | Only 3 articles live | **Marketing** — content creation |
| **Case studies page** | No content | **Marketing** |
| **Managed SOC landing page** | No content | **Marketing** |
| **Egypt / KSA pages** | No content | **Marketing** |
| **Compliance pages** (SAMA, NCA, CBE, PDPL) | No content | **Marketing** |
| **Custom OG images per blog** | Same default image everywhere | **Marketing / Design** — hero assets |
| **Blog URLs in sitemap** | Quick dev task, not prioritized yet | **Dev** — ~30 min after marketing sign-off |
| **www → apex redirect (live)** | Code ready | **DevOps** — confirm Cloudflare/nginx |
| **Industries hub crawl** | Hub still tab-based; 3 subpages OK | **Dev** — low priority |
| **Image / video compression** | Large blog PNGs + hero video | **Dev** — low priority |
| **Full accessibility audit** | ~94 Lighthouse; no systematic pass | **Dev / QA** — separate track |
| **CSP header** | Would break GTM, live chat, Maps | **Dev** — deferred intentionally |

---

## 📊 Snapshot

- **Technical SEO:** ~85% complete  
- **Content / landing pages:** ~15% — **marketing-led**  
- **Blocked items:** mostly **decisions + content**, not engineering capacity  

---

## Decisions needed this week

1. Primary email — `@whiteguard.io` or `@whiteguard.co.uk`?  
2. Confirm **64+** client metric?  
3. Show phone in Google company data — yes/no?  
4. Real blog publish dates?  
5. Q3 priority — case studies, SOC page, or geo pages?

**After answers → dev can close remaining technical items in 1–2 days.**

---

*Full technical detail: `docs/seo-status-report.md`*
