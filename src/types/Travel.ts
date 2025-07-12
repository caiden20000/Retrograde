import { SpaceDate } from "./SpaceDate";
import { Station } from "./Station";

export type Travel = {
  readonly from: Station;
  readonly to: Station;
  readonly distance: number;
  readonly progress: number;
  readonly travelSpeed: number;
  readonly startedAt: number;
  readonly fuelBefore: number;
  readonly fuelAfter: number;
  readonly startDate: SpaceDate;
  readonly timeToTravel: number;
};
