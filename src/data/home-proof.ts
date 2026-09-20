import homeProofData from "./home-proof.json";

export type HomeProofData = typeof homeProofData;

export function getHomeProofData(): HomeProofData {
  return homeProofData;
}
