import { newShipType } from "../logic/shipType";
import { ShipType } from "../types/ShipType";
import { floor } from "../utils/util";

const baseCargo = 50;
const baseFuel = 20;
const baseCost = 1000;
const baseAttack = 5;
const baseDefense = 5;

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
  dart: newShipType(
    "Dart",
    0,
    baseCargo,
    baseFuel,
    baseCost,
    1,
    baseAttack,
    baseDefense
  ),
  trawler: newShipType(
    "Trawler",
    1,
    baseCargo * 2,
    floor(baseFuel * 0.8),
    baseCost * 2,
    2,
    floor(baseAttack * 1.5),
    baseDefense * 2.0
  ),
  caravel: newShipType(
    "Caravel",
    2,
    baseCargo * 3,
    floor(baseFuel * 1.2),
    baseCost * 4,
    3,
    baseAttack * 2.0,
    baseDefense * 3.0
  ),
  galleon: newShipType(
    "Galleon",
    3,
    baseCargo * 4,
    floor(baseFuel * 1.6),
    baseCost * 8,
    4,
    floor(baseAttack * 2.5),
    baseDefense * 4.0
  ),
  eastman: newShipType(
    "Eastman",
    4,
    baseCargo * 5,
    baseFuel * 2.0,
    baseCost * 16,
    5,
    baseAttack * 3.0,
    baseDefense * 5.0
  ),
  carrier: newShipType(
    "Carrier",
    5,
    baseCargo * 5,
    baseFuel * 5.0,
    baseCost * 32,
    6,
    floor(baseAttack * 5.5),
    floor(baseDefense * 5.5)
  ),

  ketch: newShipType(
    "Ketch",
    1,
    floor(baseCargo * 1.1),
    baseFuel * 2,
    baseCost * 2,
    2,
    baseAttack * 2.0,
    floor(baseDefense * 1.5)
  ),
  brig: newShipType(
    "Brig",
    2,
    floor(baseCargo * 1.5),
    baseFuel * 3,
    baseCost * 4,
    3,
    baseAttack * 3.0,
    baseDefense * 2.0
  ),
  frigate: newShipType(
    "Frigate",
    3,
    floor(baseCargo * 1.9),
    baseFuel * 4,
    baseCost * 8,
    4,
    baseAttack * 4.0,
    floor(baseDefense * 2.5)
  ),
  dreadnought: newShipType(
    "Dreadnought",
    4,
    floor(baseCargo * 2.3),
    baseFuel * 5,
    baseCost * 16,
    5,
    baseAttack * 5.0,
    floor(baseDefense * 3.0)
  ),
};

export const allShipTypes = Object.keys(shipType).map((key) => shipType[key]);
