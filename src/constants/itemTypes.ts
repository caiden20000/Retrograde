import { newItemType } from "../logic/itemType";
import { ItemType } from "../types/ItemType";

export const itemType: { [key: string]: ItemType } = {
  nutripaste: newItemType("Nutripaste", 5, 20, ["food", "essential"]),
  freshAir: newItemType("FreshAir", 10, 5, ["essential"]),
  aquaLite: newItemType("AquaLite", 20, 8, ["drink", "essential"]),
  medicalSupplies: newItemType("Medical Supplies", 2, 50, ["essential", "medical"]),
  fuel: newItemType("Fuel", 2, 2, ["essential"]),

  preppedCuisine: newItemType("Prepped Cuisine", 2, 30, ["food"]),
  drinks: newItemType("Drinks", 1, 15, ["drink"]),

  miningCatalyst: newItemType("Mining Catalyst", 3, 200, ["mining"]),
  lowGradeOre: newItemType("Low grade ore", 10, 15, ["mining", "ore"]),
  highGradeOre: newItemType("High grade ore", 8, 100, ["mining", "ore"]),
  lowGradeMetal: newItemType("Low grade metal", 5, 30, ["mining"]),
  highGradeMetal: newItemType("High-grade metal", 5, 50, ["materials"]),

  fasteners: newItemType("Fasteners", 1, 10, ["components"]),
  scrap: newItemType("Scrap", 10, 5, ["components"]),
  crystals: newItemType("Crystals", 1, 100, ["components"]),
  batteries: newItemType("Batteries", 3, 40, ["components"]),
  magnets: newItemType("Magnets", 2, 25, ["components"]),

  tools: newItemType("Tools", 2, 60, ["goods", "mining"]),
  furniture: newItemType("Furniture", 50, 150, ["goods"]),
  containers: newItemType("Containers", 10, 80, ["goods"]),
  electronics: newItemType("Electronics", 3, 200, ["goods"]),

  jewelry: newItemType("Jewelry", 0.5, 500, ["luxury"]),
  spices: newItemType("Spices", 0.2, 200, ["luxury"]),
  exoticAnimals: newItemType("Exotic animals", 50, 1000, ["luxury"]),

  narcotics: newItemType("Narcotics", 1, 300, ["contraband"]),
  explosives: newItemType("Explosives", 5, 500, ["contraband"]),
  weapons: newItemType("Weapons", 10, 800, ["contraband"]),
};

export const allItemTypes = Object.keys(itemType).map((key: string) => itemType[key]);
