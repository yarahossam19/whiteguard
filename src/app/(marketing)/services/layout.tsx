import type { Metadata } from "next";

const SERVICES_META_TITLE =
  "Cybersecurity Services for MENA Enterprises | WhiteGuard";
const SERVICES_META_DESCRIPTION =
  "WhiteGuard's cybersecurity services and cyber security solutions — Red Team, Blue Team, GRC, Training. SAMA, CBE, ISO 27001 & PCI-DSS aligned.";

export const metadata: Metadata = {
  title: { absolute: SERVICES_META_TITLE },
  description: SERVICES_META_DESCRIPTION,
  openGraph: {
    title: SERVICES_META_TITLE,
    description: SERVICES_META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_META_TITLE,
    description: SERVICES_META_DESCRIPTION,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
