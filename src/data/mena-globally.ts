import menaGloballyData from "./mena-globally.json";

export type MenaGloballyData = typeof menaGloballyData;

export function getMenaGloballyData(): MenaGloballyData {
  return menaGloballyData;
}
