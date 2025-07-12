import { ShipType } from "../types/ShipType";

export function newShipType(
  name: string,
  crewCapacity: number,
  cargoCapacity: number,
  fuelCapacity: number,
  baseCost: number
): ShipType {
  return {
    name,
    crewCapacity,
    cargoCapacity,
    fuelCapacity,
    baseCost,
  };
}
