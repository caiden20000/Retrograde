import { Inventory } from "./Inventory";
import { Player } from "./Player";
import { Station } from "./Station";

export type Cart = {
  player: Player;
  station: Station;
  cartInventory: Inventory;
};
