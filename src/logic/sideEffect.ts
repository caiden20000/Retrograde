import { allItemTypes } from "../constants/itemTypes";
import { ITEM_TAG } from "../types/ItemTag";
import { SideEffect } from "../types/SideEffect";
import { randomInt, randomItems } from "../utils/util";
import { addItemCount, cloneInventory, newInventory } from "./inventory";
import { getItemTypesByTag } from "./itemType";

const emptySideEffect = (): SideEffect => ({
  namedEffects: [],
  money: 0,
  fuel: 0,
  cargo: newInventory(),
});

export function newSideEffect(options?: Partial<SideEffect>): SideEffect {
  return {
    ...emptySideEffect(),
    ...options,
  };
}

export function cloneSideEffect(sideEffect: SideEffect): SideEffect {
  return {
    ...sideEffect,
    namedEffects: [...sideEffect.namedEffects],
    cargo: cloneInventory(sideEffect.cargo),
  };
}

export function doSideEffect(sideEffect: SideEffect): void {
  // This needs to be a thunk
}

export const commonSideEffects = {
  randomValuables: (sideEffect: SideEffect): SideEffect => {
    const itemTypes = getItemTypesByTag("luxury");
    const twoTypes = randomItems(itemTypes, 2);
    let inventory = newInventory();
    for (const itemType of twoTypes) {
      const randomCount = randomInt(1, 5);
      inventory = addItemCount(inventory, itemType, randomCount);
    }
    const newSideEffect = cloneSideEffect(sideEffect);
    newSideEffect.cargo = inventory;
    return newSideEffect;
  },
  smallReward: (sideEffect: SideEffect): SideEffect => {
    const newSideEffect = cloneSideEffect(sideEffect);
    newSideEffect.money = randomInt(500, 2000);
    return newSideEffect;
  },
  loseFuel: (sideEffect: SideEffect): SideEffect => {
    const newSideEffect = cloneSideEffect(sideEffect);
    newSideEffect.fuel = randomInt(-10, -5);
    return newSideEffect;
  },
};

export function applyCommonSideEffects(sideEffect: SideEffect): SideEffect {
  let finalSideEffect = sideEffect;
  for (const commonSideEffect of sideEffect.namedEffects) {
    finalSideEffect = commonSideEffects[commonSideEffect](finalSideEffect);
  }
  finalSideEffect.namedEffects = [];
  return finalSideEffect;
}

export function itemizeSideEffect(
  preSideEffect: SideEffect
): [string, string][] {
  const sideEffect = applyCommonSideEffects(preSideEffect);
  const list: [string, string][] = [];
  if (sideEffect.money !== 0) {
    list.push([
      "Money",
      `${sideEffect.money < 0 ? "- $" : "+ $"}${Math.abs(
        sideEffect.money
      ).toString()}`,
    ]);
  }
  for (const [item, value] of Object.entries(sideEffect.cargo)) {
    list.push([item, `+ ${value >= 0 ? "+" : "-"} ${value}`]);
  }
  return list;
}

export type CommonSideEffect = keyof typeof commonSideEffects;
