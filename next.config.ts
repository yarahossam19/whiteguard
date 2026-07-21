import type { NextConfig } from "next";
import { getFlatServiceRedirects } from "./service-redirects.mjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /**
   * Permanent redirect www → apex. Also configure at the CDN/DNS layer (Cloudflare/Vercel
   * domain settings) so both hostnames resolve and this rule can run.
   */
  async redirects() {
    const tabRedirects = [
      { tab: "offensive", destination: "/services/offensive" },
      { tab: "defensive", destination: "/services/defensive" },
      { tab: "grc", destination: "/services/grc" },
      { tab: "training", destination: "/services/training" },
    ].map(({ tab, destination }) => ({
      source: "/services",
      has: [{ type: "query" as const, key: "tab", value: tab }],
      destination,
      permanent: true,
    }));

    const flatServiceRedirects = getFlatServiceRedirects().map(
      ({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      }),
    );

    return [
      ...tabRedirects,
      ...flatServiceRedirects,
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.whiteguard.io" }],
        destination: "https://whiteguard.io/:path*",
        permanent: true,
      },
    ];
  },
  /** So `/api/contact` can read PNGs from disk for base64 email logos on Vercel. */
  outputFileTracingIncludes: {
    "/api/contact": [
      "./public/images/logo-icon.png",
      "./public/images/WhiteGuardText.png",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
