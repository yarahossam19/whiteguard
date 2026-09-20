import homeMetricsData from "./home-metrics.json";

export type HomeMetricsData = typeof homeMetricsData;

export function getHomeMetricsData(): HomeMetricsData {
  return homeMetricsData;
}
