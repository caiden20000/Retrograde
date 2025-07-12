import { REVOLUTIONS_IN_CYCLE } from "../constants";
import { SpaceDate } from "../types/SpaceDate";
import { padStart } from "../utils/util";

export function cloneSpaceDate(spaceDate: SpaceDate): SpaceDate {
  return { ...spaceDate };
}

export function addRevolutions(date: SpaceDate, revs: number): SpaceDate {
  const newDate = { ...date };
  newDate.revolution += revs;
  newDate.cycle += Math.floor(newDate.revolution / REVOLUTIONS_IN_CYCLE);
  newDate.revolution = newDate.revolution % REVOLUTIONS_IN_CYCLE;
  return newDate;
}

export function newSpaceDate(cycle: number = 3000, revolution: number = 0): SpaceDate {
  return { cycle, revolution };
}

export function spaceDateToString(spaceDate: SpaceDate): string {
  return `${spaceDate.cycle}.${padStart(spaceDate.revolution.toString(), "0", 3)}`;
}
