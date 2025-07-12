import { Inventory, newInventory } from "./inventory";
import { allItemTypes, ItemType } from "./item-type";
import { Player } from "./player";
import { Station } from "./station";
import * as Trd from "./trade-inventory";
import * as Inv from "./inventory";
import { getFreeCargoSpace } from "./ship";
import { set } from "./util";

export type Cart = {
  player: Player;
  station: Station;
  cartInventory: Inventory;
};

export function newCart(player: Player, station: Station): Cart {
  return {
    player,
    station,
    cartInventory: newInventory(),
  };
}

export function cloneCart(cart: Cart): Cart {
  return {
    ...cart,
    cartInventory: Inv.cloneInventory(cart.cartInventory),
  };
}

export function addToCart(
  cart: Cart,
  itemType: ItemType,
  count: number = 1
): Cart {
  let cartInventory = Inv.addItemCount(cart.cartInventory, itemType, count);
  const newCart = set(cart, { cartInventory });
  if (!isCartValid(cart)) {
    return cart;
  } else {
    return newCart;
  }
}

export function canAdd(
  cart: Cart,
  itemType: ItemType,
  count: number = 1
): boolean {
  let cartInventory = Inv.addItemCount(cart.cartInventory, itemType, count);
  const newCart = set(cart, { cartInventory });
  return isCartValid(newCart);
}

export function canRemove(
  cart: Cart,
  itemType: ItemType,
  count: number = 1
): boolean {
  return canAdd(cart, itemType, -count);
}

export function isCartValid(cart: Cart): boolean {
  for (const itemType of allItemTypes) {
    const cartCount = Inv.getItemCount(cart.cartInventory, itemType);
    if (cartCount < 0 && !doesPlayerHave(cart, itemType, -cartCount))
      return false;
    if (cartCount > 0 && !doesStationHave(cart, itemType, cartCount))
      return false;
  }
  if (!canPlayerAfford(cart, getCartCost(cart))) return false;
  if (!canShipHold(cart, getCartWeight(cart))) return false;
  return true;
}

export function getCartCost(cart: Cart): number {
  let sum = 0;
  for (const itemType of allItemTypes) {
    const cartCount = Inv.getItemCount(cart.cartInventory, itemType);
    if (cartCount < 0)
      sum -= Trd.getItemSellPrice(
        cart.station.tradeInventory,
        itemType,
        -cartCount
      );
    if (cartCount > 0)
      sum += Trd.getItemBuyPrice(
        cart.station.tradeInventory,
        itemType,
        cartCount
      );
  }
  return sum;
}

export function getCartWeight(cart: Cart): number {
  let sum = 0;
  for (const itemType of allItemTypes) {
    const cartCount = Inv.getItemCount(cart.cartInventory, itemType);
    sum += cartCount * itemType.weight;
  }
  return sum;
}

export function getItemCost(cart: Cart, itemType: ItemType): number {
  const cartCount = Inv.getItemCount(cart.cartInventory, itemType);
  const sellPrice = Trd.getItemSellPrice(cart.station.tradeInventory, itemType);
  const buyPrice = Trd.getItemBuyPrice(cart.station.tradeInventory, itemType);
  if (cartCount < 0) return sellPrice * cartCount;
  if (cartCount > 0) return buyPrice * cartCount;
  return 0;
}

export function getItemWeight(cart: Cart, itemType: ItemType): number {
  const cartCount = Inv.getItemCount(cart.cartInventory, itemType);
  return cartCount * itemType.weight;
}

export function getItemCount(cart: Cart, itemType: ItemType): number {
  return Inv.getItemCount(cart.cartInventory, itemType);
}

export function canPlayerAfford(cart: Cart, cost: number): boolean {
  return cart.player.currency >= cost;
}

export function canShipHold(cart: Cart, weight: number): boolean {
  const cargoSpaceLeft = getFreeCargoSpace(cart.player.ship);
  return weight <= cargoSpaceLeft;
}

export function doesStationHave(
  cart: Cart,
  itemType: ItemType,
  count: number
): boolean {
  return Trd.getItemCount(cart.station.tradeInventory, itemType) >= count;
}

export function doesPlayerHave(
  cart: Cart,
  itemType: ItemType,
  count: number
): boolean {
  return Inv.getItemCount(cart.player.ship.inventory, itemType) >= count;
}

export function maxBuy(cart: Cart, itemType: ItemType): number {
  const maxQuantity = Trd.getItemCount(cart.station.tradeInventory, itemType);
  const buyPrice = Trd.getItemBuyPrice(cart.station.tradeInventory, itemType);
  const maxAfford = Math.floor(cart.player.currency / buyPrice);
  const maxWeight = Math.floor(
    getFreeCargoSpace(cart.player.ship) / itemType.weight
  );
  return (
    Math.max(maxQuantity, maxAfford, maxWeight) - getItemCount(cart, itemType)
  );
}

export function maxSell(cart: Cart, itemType: ItemType): number {
  const maxQuantity = Inv.getItemCount(cart.player.ship.inventory, itemType);
  return Math.max(maxQuantity) - getItemCount(cart, itemType);
}

export function hasItems(cart: Cart): boolean {
  for (const itemType of allItemTypes) {
    if (Inv.getItemCount(cart.cartInventory, itemType) != 0) return true;
  }
  return false;
}
