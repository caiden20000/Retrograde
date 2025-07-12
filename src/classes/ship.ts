import {
  cloneInventory,
  getItemCount,
  Inventory,
  newInventory,
} from "./inventory";
import { allItemTypes } from "./item-type";
import { ShipType } from "./ship-type";

/** Holds ship type information and cargo.  */
export type Ship = {
  readonly shipType: ShipType;
  readonly inventory: Inventory;
  readonly fuel: number;
};

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
