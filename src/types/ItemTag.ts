export const ITEM_TAG = [
  "food",
  "drink",
  "essential",
  "mining",
  "luxury",
  "components",
  "contraband",
  "materials",
  "medical",
  "ore",
  "goods",
] as const;

export type ItemTag = (typeof ITEM_TAG)[number];
