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

export function subtractInventory(
  inventory: Inventory,
  loss: Inventory
): Inventory {
  let finalInventory = cloneInventory(inventory);

  for (const itemType of allItemTypes) {
    finalInventory = addItemCount(
      finalInventory,
      itemType,
      -getItemCount(loss, itemType)
    );
  }
  return finalInventory;
}

export function calculateReductionLoss(
  inventory: Inventory,
  weightLimit: number
): Inventory | null {
  let inventoryWeight = getTotalWeight(inventory);
  if (inventoryWeight <= weightLimit) return null;

  const itemTypesSortedByWeight = [...allItemTypes].sort(
    (a, b) => b.weight - a.weight
  );

  let loss = newInventory();
  for (const itemType of itemTypesSortedByWeight) {
    const itemCount = getItemCount(inventory, itemType);
    const itemTotalWeight = itemCount * itemType.weight;
    if (inventoryWeight - itemTotalWeight > weightLimit) {
      loss = addItemCount(loss, itemType, itemCount);
      inventoryWeight -= itemTotalWeight;
    } else {
      const requiredWeightLoss = inventoryWeight - weightLimit;
      const requiredItemLoss = Math.ceil(requiredWeightLoss / itemType.weight);
      loss = addItemCount(loss, itemType, requiredItemLoss);
      break;
    }
    if (inventoryWeight < 0)
      throw new Error("Inventory weight reduced past zero!");
  }
  return loss;
}

export function reduceTo(inventory: Inventory, weightLimit: number): Inventory {
  let result = cloneInventory(inventory);
  const reductionLoss = calculateReductionLoss(inventory, weightLimit);
  if (reductionLoss === null) return result;
  return subtractInventory(result, reductionLoss);
}

/**
 * for (itemType in sortedByWeight)
 *    if (totalItemType)
 */
