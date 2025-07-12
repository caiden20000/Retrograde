import { newShipType } from "../logic/shipType";
import { ShipType } from "../types/ShipType";

export const shipType: { [key: string]: ShipType } = {
  none: newShipType("None", 1, 0, 0, 0),
  dart: newShipType("Dart", 1, 40, 250, 450),
  frigate: newShipType("Frigate", 3, 250, 600, 1500),
};
export const allShipTypes = Object.keys(shipType).map((key) => shipType[key]);
