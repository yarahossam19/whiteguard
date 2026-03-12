import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | WHITEGUARD",
  description:
    "Explore our security services: Offensive Security, Defensive Security, GRC, and Awareness Training.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
