import { Inventory } from "./Inventory";
import { ShipType } from "./ShipType";

export type Ship = {
  readonly shipType: ShipType;
  readonly inventory: Inventory;
  readonly fuel: number;
};
