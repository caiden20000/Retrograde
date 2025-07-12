import { Station } from "./station";
import { SpaceDate } from "./time";
import { floor } from "./util";
import { getDistance } from "./vec2";

// Travel speed is milliseconds per parsec
export const TRAVEL_SPEED = 50;

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

export function newTravel(
  from: Station,
  to: Station,
  fuelBefore: number,
  fuelAfter: number,
  startDate: SpaceDate,
  timeToTravel: number
): Travel {
  return {
    from,
    to,
    distance: floor(getDistance(from.position, to.position)),
    progress: 0.0,
    travelSpeed: TRAVEL_SPEED,
    startedAt: Date.now(),
    fuelBefore,
    fuelAfter,
    startDate,
    timeToTravel,
  };
}
