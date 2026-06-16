import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript,
} from "@/components/analytics/GoogleTagManager";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WHITEGUAR",
    template: "%s | Whiteguard",
  },
  description:
    "Empowering businesses with intelligent, continuous security monitoring. Your trusted partner in the digital landscape.",
  manifest: "/site.webmanifest",
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
        <GoogleTagManagerScript />
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
