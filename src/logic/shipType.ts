import { ShipType } from "../types/ShipType";

export function newShipType(
  name: string,
  crewCapacity: number,
  cargoCapacity: number,
  fuelCapacity: number,
  baseCost: number,
  equipment: number,
  baseAttack: number,
  baseDefense: number
): ShipType {
  return {
    name,
    crewCapacity,
    cargoCapacity,
    fuelCapacity,
    baseCost,
    equipment,
    baseAttack,
    baseDefense,
  };
}
