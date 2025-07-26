// What can happen in a side effect?
// Gain/lose
//    - Money
//    - Cargo
//    - Reputaiton
//    - Crew
// Anything else?

import { CommonSideEffect } from "../logic/sideEffect";
import { Inventory } from "./Inventory";

export type SideEffect = {
  /** Named effects are to be resolved by a function before applying side effect. */
  namedEffects: CommonSideEffect[];
  money: number;
  fuel: number;
  cargo: Inventory;
  // Reputation TODO
  // Crew TODO
};
