import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Cloudflare Workers adapter config.
 *
 * The incremental cache is not optional here, even with no ISR: it is where
 * OpenNext reads prerendered pages from. Without one, every `generateStaticParams`
 * route - all four service pillars, the 27 service pages and the resource
 * articles - 404s on the worker while the plain static routes keep working.
 *
 * The stock template uses an R2-backed cache, which means an R2 bucket has to
 * exist before a deploy can succeed. This site never revalidates - there is no
 * `revalidate` or `revalidateTag` anywhere in src/, and all 57 routes are
 * prerendered at build time - so the read-only static-assets cache is the right
 * fit. It serves that prerendered output straight from Workers assets and needs
 * no bucket.
 *
 * If a route ever starts revalidating, this has to become the R2 cache and
 * wrangler.jsonc needs the NEXT_INC_CACHE_R2_BUCKET binding back.
 * See https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
