export const STATION_INDUSTRY = [
  "mining",
  "refining",
  "manufacturing",
  "assembling",
  "trading",
  "supplying",
] as const;

export type StationIndustry = (typeof STATION_INDUSTRY)[number];
