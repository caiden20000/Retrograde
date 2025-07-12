import { addItemCount, cloneInventory, Inventory } from "./inventory";
import { allItemTypes } from "./item-type";
import { cloneShip, newShip, Ship } from "./ship";
import { shipType } from "./ship-type";
import { setAttribute, set } from "./util";

export type Player = {
  readonly ship: Ship;
  readonly currency: number;
};

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
