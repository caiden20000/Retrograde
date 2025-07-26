import { TRAVEL_SPEED } from "../constants";
import { SpaceDate } from "../types/SpaceDate";
import { Station } from "../types/Station";
import { Travel } from "../types/Travel";
import { floor } from "../utils/util";
import { getDistance } from "./vec2";

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
    alreadyElapsed: 0,
    fuelBefore,
    fuelAfter,
    startDate,
    timeToTravel,
  };
}
