import { allItemTypes } from "../constants/itemTypes";
import { Inventory } from "../types/Inventory";
import { Ship } from "../types/Ship";
import { ShipType } from "../types/ShipType";
import { cloneInventory, getItemCount, newInventory } from "./inventory";

export function newShip(shipType: ShipType): Ship {
  return {
    shipType,
    inventory: newInventory(),
    fuel: shipType.fuelCapacity,
  };
}

export function cloneShip(ship: Ship): Ship {
  return {
    ...ship,
    inventory: cloneInventory(ship.inventory),
  };
}

/** Returns the total weight of the ship's inventory. */
export function getCargoUsage(ship: Ship): number {
  let sum = 0;
  for (const itemType of allItemTypes) {
    const itemCount = getItemCount(ship.inventory, itemType);
    if (itemCount == 0) continue;
    sum += itemCount * itemType.weight;
  }
  return sum;
}

export function getFreeCargoSpace(ship: Ship): number {
  return ship.shipType.cargoCapacity - getCargoUsage(ship);
}
