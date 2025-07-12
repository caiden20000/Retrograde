// Station.ts

import { generateFlavortext } from "./flavortext";
import { allItemTypes, ItemTag, ItemType } from "./item-type";
import { generateRandomName } from "./name-generator";
import { System } from "./system";
import {
  addItemCount,
  cloneTradeInventory,
  newTradeInventory,
  setItemBaseQuantity,
  TradeInventory,
} from "./trade-inventory";
import { capitalize, randomInt, randomOf, set } from "./util";
import { newVec2, Vec2 } from "./vec2";

export type Station = {
  readonly id: string;
  readonly name: string;
  readonly tradeInventory: TradeInventory;
  readonly position: Vec2;
  readonly z: number;
  readonly visited: boolean;
  readonly type: StationType;
  readonly industry: StationIndustry;
  readonly populationClass: PopulationClass;
  readonly population: number;
  readonly flavor: string;
};

export function newStation(id: string, position: Vec2): Station {
  const type = randomType();
  const populationClass = randomPopulationClassFromType(type);
  const industry = randomIndustryFromType(type);
  let station: Station = {
    id,
    name: generateRandomName() + " " + capitalize(type),
    tradeInventory: newTradeInventory(),
    position,
    z: randomInt(0, 8),
    visited: false,
    type,
    industry,
    populationClass,
    population: populationFromPopulationClass(populationClass),
    flavor: generateFlavortext(type, industry, populationClass),
  };
  station = populateStationInventory(station);
  return station;
}

export function cloneStation(station: Station): Station {
  return {
    ...station,
    tradeInventory: cloneTradeInventory(station.tradeInventory),
  };
}

function randomType(): StationType {
  return randomOf(allStationTypes);
}

function randomIndustryFromType(type: StationType): StationIndustry {
  return randomOf(stationTypeToIndustry[type]);
}

function randomPopulationClassFromType(type: StationType): PopulationClass {
  return randomOf(stationTypeToPopulationClasses[type]);
}

function getItemTagsFromStationIndustry(
  stationIndustry: StationIndustry
): ItemTag[] {
  return [...stationIndustryToItemTags[stationIndustry], "essential"];
}

const stationIndustryToItemTags: { [Key in StationIndustry]: ItemTag[] } = {
  mining: ["mining"],
  refining: ["mining", "materials"],
  manufacturing: ["materials", "components"],
  assembling: ["components", "goods"],
  trading: [
    "food",
    "drink",
    "essential",
    "luxury",
    "components",
    "contraband",
    "materials",
    "medical",
    "goods",
  ],
  supplying: ["food", "drink", "medical"],
};

function populateStationInventory(station: Station): Station {
  // Item amount
  const itemMultiplier = 10 ** station.populationClass;
  let newStation = station;

  // Item types
  const itemTypes: ItemType[] = getItemTypesForStation(station);

  for (const itemType of itemTypes) {
    const randomAmount = randomInt(1, 100) * itemMultiplier;
    let tradeInventory = newStation.tradeInventory;
    tradeInventory = addItemCount(tradeInventory, itemType, randomAmount);
    tradeInventory = setItemBaseQuantity(
      tradeInventory,
      itemType,
      randomAmount
    );
    newStation = set(newStation, { tradeInventory });
  }
  return newStation;
}

export type StationType =
  | "station"
  | "outpost"
  | "depot"
  | "relay"
  | "hub"
  | "refinery"
  | "factory";

const allStationTypes: StationType[] = [
  "station",
  "outpost",
  "depot",
  "relay",
  "hub",
  "refinery",
  "factory",
];

export type PopulationClass = 1 | 2 | 3 | 4;

export type StationIndustry =
  | "mining"
  | "refining"
  | "manufacturing"
  | "assembling"
  | "trading"
  | "supplying";

const stationTypeToPopulationClasses: {
  [Key in StationType]: PopulationClass[];
} = {
  station: [2, 3, 4],
  outpost: [1, 2],
  depot: [2, 3],
  relay: [1, 2],
  hub: [4],
  refinery: [1, 2, 3],
  factory: [1, 2, 3],
};

const stationTypeToIndustry: { [Key in StationType]: StationIndustry[] } = {
  station: ["trading", "supplying"],
  outpost: ["mining", "supplying"],
  depot: ["mining", "refining", "manufacturing", "assembling"],
  relay: ["supplying"],
  hub: ["trading"],
  refinery: ["refining"],
  factory: ["mining", "refining", "manufacturing", "assembling"],
};

function populationFromPopulationClass(
  populationClass: PopulationClass
): number {
  if (populationClass == 1) return randomInt(100, 1000);
  if (populationClass == 2) return randomInt(100, 1000) * 10;
  if (populationClass == 3) return randomInt(100, 1000) * 100;
  if (populationClass == 4) return randomInt(100, 1000) * 1000;
  return 0;
}

export function getItemTypesForStation(station: Station): ItemType[] {
  const itemTags = getItemTagsFromStationIndustry(station.industry);
  const itemTypes: ItemType[] = [];
  for (const itemType of allItemTypes) {
    if (itemType.tags.some((tag) => itemTags.some((tag2) => tag == tag2))) {
      itemTypes.push(itemType);
    }
  }
  return itemTypes;
}

/*
Traits of Stations

Type
- Station: Any size, any industry
- Outpost: Smaller, usually industrial
- Depot: Medium, industrial only
- Relay: Tiny, all goods
- Hub: Large, all goods


Population
- Population class (1, 2, 3, 4)
- Controls how many crew is available to hire
- Randomly generate exact population based on the pop class
- Station size determines what denomination of station it can be.

Industry
- Mining
    - Ore
- Refining
    - Ore, Metal
- Manufacturing
    - Metal, components
- Assembling
    - Components, goods
- Trading
    - Goods + everything else
- Supplying
    - Essentials + 2 random


*/
