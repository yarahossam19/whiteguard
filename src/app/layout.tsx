import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DEFAULT_OG_IMAGE, SITE_NAME, metadataBase } from "@/lib/metadata";
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript,
} from "@/components/analytics/GoogleTagManager";
import {
  SmartsuppChatNoScript,
  SmartsuppChatScript,
} from "@/components/analytics/SmartsuppChat";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema } from "@/lib/schema";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ROOT_DESCRIPTION =
  "Empowering businesses with intelligent, continuous security monitoring. Your trusted partner in the digital landscape.";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: ROOT_DESCRIPTION,
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: ROOT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: ROOT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="0lqEsKlzYOHsMmUoI2XErolOme7kJb-SW0IzrECZRUA"
        />
        <JsonLd data={buildOrganizationSchema()} />
        <GoogleTagManagerScript />
      </head>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <GoogleTagManagerNoScript />
        {children}
        <ScrollToTopButton />
        {/* <SmartsuppChatScript />  */}
        {/* <SmartsuppChatNoScript />  */}
      </body>
    </html>
  );
}
