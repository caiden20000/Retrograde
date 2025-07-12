import { shipType } from "../constants/shipTypes";
import { Player } from "../types/Player";
import { Ship } from "../types/Ship";
import { set } from "../utils/util";
import { cloneShip, newShip } from "./ship";

export function newPlayer(): Player {
  return {
    ship: newShip(shipType.none),
    currency: 0,
  };
}

export function clonePlayer(player: Player): Player {
  return {
    ship: cloneShip(player.ship),
    currency: player.currency,
  };
}

export function setCurrency(player: Player, currency: number): Player {
  return set(player, { currency });
}

export function setShip(player: Player, ship: Ship): Player {
  return set(player, { ship });
}

export function initTestPlayer(): Player {
  return set(newPlayer(), {
    currency: 1000,
    ship: newShip(shipType.dart),
  });
}
