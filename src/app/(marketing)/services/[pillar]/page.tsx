import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesPillarPage from "@/components/services/ServicesPillarPage";
import {
  getServicePillarTabMetadata,
  isServicePillarTab,
  SERVICE_PILLAR_TABS,
  type ServicePillarTab,
} from "@/lib/services-pillar-tabs";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PILLAR_TABS.map((pillar) => ({ pillar }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar } = await params;
  if (!isServicePillarTab(pillar)) {
    return { title: "Services" };
  }
  return getServicePillarTabMetadata(pillar);
}

export default async function ServicePillarRoutePage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  if (!isServicePillarTab(pillar)) notFound();

  return <ServicesPillarPage activeTab={pillar as ServicePillarTab} />;
}
