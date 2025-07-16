import { newShipType } from "../logic/shipType";
import { ShipType } from "../types/ShipType";
import { floor } from "../utils/util";

const baseCargo = 50;
const baseFuel = 20;
const baseCost = 1000;
const baseAttack = 5;
const baseDefense = 5;

const baseExp = 1.3;
const cargoExp = baseExp * 1;
const fuelExp = baseExp * 1;
const costExp = baseExp * 1;
const attackExp = baseExp * 1;
const defenseExp = baseExp * 1;

// (name, crew, cargo, fuel, cost, equipment, attack, defense)
// Dart    0 1x 1.0x $1x 1 1.0x 1.0x
// Trawler 1 2x 0.8x $2x 2 1.5x 2.0x
// Caravel 2 3x 1.2x $4x 3 2.0x 3.0x
// Galleon 3 4x 1.6x $8x 4 2.5x 4.0x
// Eastman 4 5x 2.0x $16x 5 3.0x 5.0x
// Carrier 5 5x 5.0x $32x 6 5.5x 5.5x
//
// Ketch   1 1.1x 2x $2x 2 2x 1.5x
// Brig    2 1.5x 3x $4x 3 3x 2.0x
// Frigate 3 1.9x 4x $8x 4 4x 2.5x
// Dreadnought 4 2.3x 5x $16x 5 5x 3.0x
export const shipType: { [key: string]: ShipType } = {
  none: newShipType("None", 0, 0, 0, 0, 0, 0, 0),
  dart: scaledShipType("Dart", 0, 1, 1, 1, 1, 1, 1),
  trawler: scaledShipType("Trawler", 1, 2, 0.8, 2, 2, 1.5, 2.0),
  caravel: scaledShipType("Caravel", 2, 3, 1.2, 4, 3, 2.0, 3.0),
  galleon: scaledShipType("Galleon", 3, 4, 1.6, 8, 4, 2.5, 4.0),
  eastman: scaledShipType("Eastman", 4, 5, 2.0, 16, 5, 3.0, 5.0),
  carrier: scaledShipType("Carrier", 5, 5, 5.0, 32, 6, 5.5, 5.5),

  ketch: scaledShipType("Ketch", 1, 1.1, 2, 2, 2, 2.0, 1.5),
  brig: scaledShipType("Brig", 2, 1.5, 3, 4, 3, 3.0, 2.0),
  frigate: scaledShipType("Frigate", 3, 1.9, 4, 8, 4, 4.0, 2.5),
  dreadnought: scaledShipType("Dreadnought", 4, 2.3, 5, 16, 5, 5.0, 3.0),
};

function scaledShipType(
  name: string,
  crew: number,
  cargoMul: number,
  fuelMul: number,
  costMul: number,
  equipment: number,
  attackMul: number,
  defenseMul: number
) {
  return newShipType(
    name,
    crew,
    floor(baseCargo * cargoMul ** cargoExp),
    floor(baseFuel * fuelMul ** fuelExp),
    floor(baseCost * costMul ** costExp),
    equipment,
    floor(baseAttack * attackMul ** attackExp),
    floor(baseDefense * defenseMul ** defenseExp)
  );
}

export const allShipTypes = Object.keys(shipType).map((key) => shipType[key]);
