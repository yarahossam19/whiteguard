import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** So `/api/contact` can read PNGs from disk for base64 email logos on Vercel. */
  outputFileTracingIncludes: {
    "/api/contact": [
      "./public/images/logo-icon.png",
      "./public/images/WhiteGuardText.png",
    ],
  },
  images: {
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
};

export default nextConfig;
