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
