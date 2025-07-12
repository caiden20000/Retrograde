import { Inventory } from "./Inventory";

export type TradeInventory = {
  readonly inventory: Inventory;
  /** Initial baseline quantity of products */
  readonly baseQuantity: { readonly [key: string]: number };
};
