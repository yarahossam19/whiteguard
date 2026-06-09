import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript,
} from "@/components/analytics/GoogleTagManager";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "WHITEGUARD | Intelligent Security Monitoring",
    template: "%s | WHITEGUARD",
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
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
