/** Represents a type of ship. Defines the base qualities of that ship. */
export type ShipType = {
  readonly name: string;
  readonly crewCapacity: number;
  readonly cargoCapacity: number;
  readonly fuelCapacity: number;
  readonly baseCost: number;
};

function newShipType(
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

export const shipType: { [key: string]: ShipType } = {
  none: newShipType("None", 1, 0, 0, 0),
  dart: newShipType("Dart", 1, 40, 250, 450),
  frigate: newShipType("Frigate", 3, 250, 600, 1500),
};
export const allShipTypes = Object.keys(shipType).map((key) => shipType[key]);
