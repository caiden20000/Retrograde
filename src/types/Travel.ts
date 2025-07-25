import { SpaceDate } from "./SpaceDate";
import { Station } from "./Station";

export type Travel = {
  readonly from: Station;
  readonly to: Station;
  readonly distance: number;
  /** percentage 0-1 */
  readonly progress: number;
  readonly travelSpeed: number;
  /** ms timestamp */
  readonly startedAt: number;
  /** ms */
  readonly alreadyElapsed: number;
  readonly fuelBefore: number;
  readonly fuelAfter: number;
  readonly startDate: SpaceDate;
  readonly timeToTravel: number;
};
