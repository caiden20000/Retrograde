export const STATION_TYPE = [
  "station",
  "outpost",
  "depot",
  "relay",
  "hub",
  "refinery",
  "factory",
] as const;
export type StationType = (typeof STATION_TYPE)[number];
