/** Handles the simulation of trading between stations when time passes. */

import { useEffect, useState } from "react";
import { randomInt, randomOf, set, shuffle } from "../utils/util";
import { allItemTypes } from "../constants/itemTypes";
import { ItemType } from "../types/ItemType";
import { Station } from "../types/Station";
import { System } from "../types/System";
import { getItemTypesForStation } from "./station";
import { cloneSystem, updateStationInSystem } from "./system";
import { getDistance } from "./vec2";
import * as Trd from "./tradeInventory";

const TRADE_CHANCE = 1;
const MIN_TRADE = 0.1; // Percentage of base quantity
const MAX_TRADE = 0.2; // Percentage of base quantity
const SHORTAGE_THRESHOLD = 0.1; // Percentage of base quantity
const RANDOM_TRADE_RANGE = 250;

export function runTradeForSystem(system: System, revolutions: number): System {
  let newSystem = cloneSystem(system);
  for (
    let currentRevolution = 0;
    currentRevolution <= revolutions;
    currentRevolution++
  ) {
    for (const station of newSystem) {
      const random = Math.random();
      if (random > TRADE_CHANCE) continue;
      // If shortage, forced trade to fix shortage
      const shortages = getShortagesFromStation(station);
      if (shortages.length > 0) {
        const itemType = randomOf(shortages);
        const itemQuantity =
          Trd.getItemBaseQuantity(station.tradeInventory, itemType) *
          SHORTAGE_THRESHOLD;
        const supplier = getNearestSupplier(
          system,
          station,
          itemType,
          itemQuantity
        );
        if (supplier == null) break;
        const newStations = tradeBetween(
          station,
          supplier,
          itemType,
          itemQuantity
        );
        newSystem = updateStationInSystem(
          newSystem,
          station,
          newStations.requester
        );
        newSystem = updateStationInSystem(
          newSystem,
          supplier,
          newStations.supplier
        );
      } else {
        // If no shortage, random trade to random station.
        const supplier = getRandomNeighborInRange(
          system,
          station,
          RANDOM_TRADE_RANGE
        );
        const newStations = randomTradeBetween(station, supplier);
        if (newStations != null) {
          newSystem = updateStationInSystem(
            newSystem,
            station,
            newStations.requester
          );
          newSystem = updateStationInSystem(
            newSystem,
            supplier,
            newStations.supplier
          );
        }
      }
    }
  }
  return newSystem;
}

function getShortagesFromStation(station: Station): ItemType[] {
  const allShortages: ItemType[] = [];
  for (const itemType of allItemTypes) {
    const baseQuantity = Trd.getItemBaseQuantity(
      station.tradeInventory,
      itemType
    );
    const currentQuantity = Trd.getItemCount(station.tradeInventory, itemType);
    if (currentQuantity / baseQuantity <= SHORTAGE_THRESHOLD) {
      allShortages.push(itemType);
    }
  }
  return allShortages;
}

// Note we clone the system, which makes a new System,
// but contains the same Stations instances.
function sortSystemByDistance(system: System, station: Station) {
  const distFromRequester = (x: Station) =>
    getDistance(station.position, x.position);
  const systemSortedByDistance = cloneSystem(system).sort(
    (a, b) => distFromRequester(a) - distFromRequester(b)
  );
  return systemSortedByDistance;
}

// function: Get nearest neighbor that can supply item quantity
function getNearestSupplier(
  system: System,
  requestingStation: Station,
  itemType: ItemType,
  itemQuantity: number
): Station | null {
  const systemSortedByDistance = sortSystemByDistance(
    system,
    requestingStation
  );
  for (const supplier of systemSortedByDistance) {
    // Avoid trading if it puts the supplier into a shortage (this avoids shortage loops)
    if (hasTradeableAmount(supplier, itemType, itemQuantity)) return supplier;
  }
  return null;
}

// function: Get random neighbor in range
function getRandomNeighborInRange(
  system: System,
  station: Station,
  range: number
) {
  const stationsWithinRange = system.filter(
    (stn) => stationDistance(station, stn) <= range
  );
  const randomPick = randomOf(stationsWithinRange);
  return randomPick;
}

// function: Trade items between two stations
function tradeBetween(
  requester: Station,
  supplier: Station,
  itemType: ItemType,
  itemQuantity: number
): {
  requester: Station;
  supplier: Station;
} {
  const returnValue = {
    requester: set(requester, {
      tradeInventory: Trd.addItemCount(
        requester.tradeInventory,
        itemType,
        itemQuantity
      ),
    }),
    supplier: set(supplier, {
      tradeInventory: Trd.addItemCount(
        supplier.tradeInventory,
        itemType,
        -itemQuantity
      ),
    }),
  };
  return returnValue;
}

// function: Distance between stations
function stationDistance(station1: Station, station2: Station): number {
  return getDistance(station1.position, station2.position);
}

/** Returns true if the station can lose specified quantity without causing a shortage. */
function hasTradeableAmount(
  station: Station,
  itemType: ItemType,
  itemQuantity: number
): boolean {
  const stationQuantity = Trd.getItemCount(station.tradeInventory, itemType);
  const stationBaseQuantity = Trd.getItemBaseQuantity(
    station.tradeInventory,
    itemType
  );
  const minimumQuantityToTrade =
    itemQuantity + stationBaseQuantity / SHORTAGE_THRESHOLD;
  return stationQuantity > minimumQuantityToTrade;
}

function randomTradeBetween(
  requester: Station,
  supplier: Station
): { requester: Station; supplier: Station } | null {
  // Find all possible items supplier has a quantity of
  const requesterItems = getItemTypesForStation(requester);
  let possibleItems: ItemType[] = [];
  for (const itemType of allItemTypes) {
    const supplierQuantity = Trd.getItemCount(
      supplier.tradeInventory,
      itemType
    );
    if (
      supplierQuantity > 0 &&
      requesterItems.some((item) => itemType === item)
    )
      possibleItems.push(itemType);
  }

  // Pick a random amount that won't cause a shortage
  for (const itemType of shuffle(possibleItems)) {
    const supplierQuantity = Trd.getItemCount(
      supplier.tradeInventory,
      itemType
    );
    const supplierBaseQuantity = Trd.getItemBaseQuantity(
      supplier.tradeInventory,
      itemType
    );
    if (supplierBaseQuantity === undefined) continue;
    const tradeableQuantity =
      supplierQuantity - supplierBaseQuantity * SHORTAGE_THRESHOLD;
    if (tradeableQuantity <= 0) continue;
    const maximum = Math.min(
      tradeableQuantity,
      supplierBaseQuantity * MAX_TRADE
    );
    const minimum = Math.min(
      tradeableQuantity,
      supplierBaseQuantity * MIN_TRADE
    );
    const randomTradeQuantity = randomInt(minimum, maximum);
    return tradeBetween(requester, supplier, itemType, randomTradeQuantity);
  }
  return null;
}
