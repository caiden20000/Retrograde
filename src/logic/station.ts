import { allItemTypes } from "../constants/itemTypes";
import { ItemTag } from "../types/ItemTag";
import { ItemType } from "../types/ItemType";
import { PopulationClass } from "../types/PopulationClass";
import { Station } from "../types/Station";
import { StationIndustry } from "../types/StationIndustry";
import { STATION_TYPE, StationType } from "../types/StationType";
import { Vec2 } from "../types/Vec2";
import { generateFlavortext } from "../utils/flavortext";
import { generateRandomName } from "../utils/name-generator";
import { capitalize, randomInt, randomOf, set } from "../utils/util";
import { addItemCount, cloneTradeInventory, newTradeInventory, setItemBaseQuantity } from "./tradeInventory";

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
  return randomOf([...STATION_TYPE]);
}

function randomIndustryFromType(type: StationType): StationIndustry {
  return randomOf(stationTypeToIndustry[type]);
}

function randomPopulationClassFromType(type: StationType): PopulationClass {
  return randomOf(stationTypeToPopulationClasses[type]);
}

function getItemTagsFromStationIndustry(stationIndustry: StationIndustry): ItemTag[] {
  return [...stationIndustryToItemTags[stationIndustry], "essential"];
}

const stationIndustryToItemTags: { [Key in StationIndustry]: ItemTag[] } = {
  mining: ["mining"],
  refining: ["mining", "materials"],
  manufacturing: ["materials", "components"],
  assembling: ["components", "goods"],
  trading: ["food", "drink", "essential", "luxury", "components", "contraband", "materials", "medical", "goods"],
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
    tradeInventory = setItemBaseQuantity(tradeInventory, itemType, randomAmount);
    newStation = set(newStation, { tradeInventory });
  }
  return newStation;
}

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

function populationFromPopulationClass(populationClass: PopulationClass): number {
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
