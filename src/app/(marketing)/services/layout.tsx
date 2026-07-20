import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

const SERVICES_META_TITLE =
  "Cybersecurity Services for MENA Enterprises | WhiteGuard";
const SERVICES_META_DESCRIPTION =
  "WhiteGuard's cybersecurity services and cyber security solutions — Red Team, Blue Team, GRC, Training. SAMA, CBE, ISO 27001 & PCI-DSS aligned.";

export const metadata: Metadata = buildPageMetadata({
  path: "/services",
  title: { absolute: SERVICES_META_TITLE },
  description: SERVICES_META_DESCRIPTION,
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
