# Industry detail routes (static only)

Industry detail UX is **not** driven by `industries/[slug]`. Each sector has its **own** App Router folder and React page so layouts and sections can diverge per Figma without one shared template.

## Current URLs

| URL | Route file | UI component | Data |
|-----|------------|--------------|------|
| `/industries/financial-services` | `financial-services/page.tsx` | `FinancialServicesIndustryPage` | `data/industries/pages/financial-services.json` |
| `/industries/healthcare` | `healthcare/page.tsx` | `HealthcareIndustryPage` | `data/industries/pages/healthcare.json` |
| `/industries/industrial-services` | `industrial-services/page.tsx` | `IndustrialServicesIndustryPage` | `data/industries/pages/industrial-services.json` |

Shared pieces (optional): `IndustryHeroSection`, `IndustryPageBreadcrumb`. Shared TypeScript shapes: `src/types/industry-page.ts` (`IndustryPageData`).

## Add a new industry

1. **`src/app/(marketing)/industries/<slug>/page.tsx`** — export `generateMetadata`, render your page component + `CTASection` (same pattern as existing three routes).
2. **`src/components/industries/pages/<Name>IndustryPage.tsx`** — bespoke markup per design (copy one of the existing files and change structure freely).
3. **`src/data/industries/pages/<slug>.json`** + **`get<Name>IndustryPageData()`** in a matching `.ts` file — JSON should satisfy `IndustryPageData` **or** relax types in that component only if the page is fully custom.
4. **`src/data/industries-sections.json`** — add/update the hub card (`ctaHref` must match the new path).
5. **`src/config/site.ts`** — add dropdown/footer links if needed.

The hub page `/industries` stays data-driven via `industries-sections.json` + `IndustriesSectionsSection`.
