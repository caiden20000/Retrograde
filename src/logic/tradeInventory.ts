import {
  defaultBuyPriceModifier,
  defaultSellPriceModifier,
  maxPriceMultiplier,
} from "../constants";
import { ItemType } from "../types/ItemType";
import { TradeInventory } from "../types/TradeInventory";
import * as Inv from "./inventory";
import { floor, set } from "../utils/util";

export function newTradeInventory(): TradeInventory {
  const inventory: TradeInventory = {
    inventory: Inv.newInventory(),
    baseQuantity: {},
  };
  return inventory;
}

export function cloneTradeInventory(
  tradeInventory: TradeInventory
): TradeInventory {
  return {
    inventory: Inv.cloneInventory(tradeInventory.inventory),
    baseQuantity: { ...tradeInventory.baseQuantity },
  };
}

export function setItemBaseQuantity(
  tradeInventory: TradeInventory,
  itemType: ItemType,
  quantity: number
): TradeInventory {
  const baseQuantity = set(tradeInventory.baseQuantity, {
    [itemType.name]: quantity,
  });
  return set(tradeInventory, { baseQuantity });
}

export function getItemBaseQuantity(
  tradeInventory: TradeInventory,
  itemType: ItemType
): number {
  return tradeInventory.baseQuantity[itemType.name];
}

export function getItemCount(
  tradeInventory: TradeInventory,
  itemType: ItemType
): number {
  return Inv.getItemCount(tradeInventory.inventory, itemType);
}

export function addItemCount(
  tradeInventory: TradeInventory,
  itemType: ItemType,
  count: number
): TradeInventory {
  return set(tradeInventory, {
    inventory: Inv.addItemCount(tradeInventory.inventory, itemType, count),
  });
}

export function getItemBuyPrice(
  tradeInventory: TradeInventory,
  itemType: ItemType,
  count: number = 1
): number {
  return calculateBuyPrice(tradeInventory, itemType) * count;
}

export function getItemSellPrice(
  tradeInventory: TradeInventory,
  itemType: ItemType,
  count: number = 1
): number {
  return calculateSellPrice(tradeInventory, itemType) * count;
}

/** Determines price from quantity */
function calculateBasePrice(
  tradeInventory: TradeInventory,
  itemType: ItemType
) {
  const baselinePrice = itemType.defaultPrice;
  const baselineQuantity = getItemBaseQuantity(tradeInventory, itemType);
  const maxPrice = baselineQuantity * maxPriceMultiplier;
  const currentQuantity = Inv.getItemCount(tradeInventory.inventory, itemType);
  if (baselineQuantity === 0 || baselineQuantity === undefined) return 0;
  if (currentQuantity === 0) return maxPrice;
  const price =
    1 /
    ((1 / baselineQuantity) *
      (1 / baselinePrice - 1 / maxPrice) *
      currentQuantity +
      1 / maxPrice);

  return floor(price * defaultBuyPriceModifier, 1);
}

function calculateBuyPrice(tradeInventory: TradeInventory, itemType: ItemType) {
  return calculateBasePrice(tradeInventory, itemType) * defaultBuyPriceModifier;
}

function calculateSellPrice(
  tradeInventory: TradeInventory,
  itemType: ItemType
) {
  return (
    calculateBasePrice(tradeInventory, itemType) * defaultSellPriceModifier
  );
}
