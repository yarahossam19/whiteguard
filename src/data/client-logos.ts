import clientLogosData from "./client-logos.json";

export type ClientLogoItem = (typeof clientLogosData)[number];

export type ClientLogosData = ClientLogoItem[];

export function getClientLogosData(): ClientLogosData {
  return clientLogosData;
}
