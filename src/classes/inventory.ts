import { ItemType } from "./item-type";
import { set } from "./util";

/** A ship's inventory. Tracks the amount of each item type. */
export type Inventory = { readonly [key: string]: number };

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
