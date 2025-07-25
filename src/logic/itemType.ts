import { allItemTypes } from "../constants/itemTypes";
import { ItemTag } from "../types/ItemTag";
import { ItemType } from "../types/ItemType";

export function newItemType(
  name: string,
  weight: number,
  defaultPrice: number,
  tags: ItemTag[]
): ItemType {
  return {
    name,
    weight,
    defaultPrice,
    tags,
  };
}

export function getItemTypesByTag(tag: ItemTag): ItemType[] {
  const aggregate = [];
  for (const itemType of allItemTypes) {
    if (itemType.tags.includes(tag)) {
      aggregate.push(itemType);
    }
  }
  return aggregate;
}

export function getItemTypesByTags(tags: ItemTag[]): ItemType[] {
  const aggregate = new Set<ItemType>();
  for (const tag of tags) {
    for (const itemType of getItemTypesByTag(tag)) aggregate.add(itemType);
  }
  return Array.from(aggregate.values());
}
