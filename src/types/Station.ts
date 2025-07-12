import { PopulationClass } from "./PopulationClass";
import { StationIndustry } from "./StationIndustry";
import { StationType } from "./StationType";
import { TradeInventory } from "./TradeInventory";
import { Vec2 } from "./Vec2";

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
