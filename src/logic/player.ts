import { shipType } from "../constants/shipTypes";
import { Player } from "../types/Player";
import { Ship } from "../types/Ship";
import { set } from "../utils/util";
import { cloneShip, newShip } from "./ship";

// export function newPlayer(): Player {
//   return {
//     ship: newShip(shipType.none),
//     money: 0,
//   };
// }

// export function clonePlayer(player: Player): Player {
//   return {
//     ship: cloneShip(player.ship),
//     money: player.money,
//   };
// }

// export function setCurrency(player: Player, currency: number): Player {
//   return set(player, { money });
// }

// export function setShip(player: Player, ship: Ship): Player {
//   return set(player, { ship });
// }

// export function initTestPlayer(): Player {
//   return set(newPlayer(), {
//     money: 10000,
//     ship: newShip(shipType.dart),
//   });
// }
