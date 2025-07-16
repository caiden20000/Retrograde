import { allItemTypes } from "../constants/itemTypes";
import { Inventory } from "../types/Inventory";
import { ItemType } from "../types/ItemType";
import { set } from "../utils/util";

export function newInventory(): Inventory {
  return {};
}

export function cloneInventory(inventory: Inventory): Inventory {
  return { ...inventory };
}

export function getItemCount(inventory: Inventory, item: ItemType): number {
  return inventory[item.name] ?? 0;
}

export function setItemCount(
  inventory: Inventory,
  item: ItemType,
  value: number
): Inventory {
  return set(inventory, { [item.name]: value });
}

export function addItemCount(
  inventory: Inventory,
  item: ItemType,
  value: number
): Inventory {
  const newCount = getItemCount(inventory, item) + value;
  return setItemCount(inventory, item, newCount);
}

export function getTotalWeight(inventory: Inventory): number {
  let sum = 0;
  for (const itemType of allItemTypes) {
    sum += getItemCount(inventory, itemType) * itemType.weight;
  }
  return sum;
}
