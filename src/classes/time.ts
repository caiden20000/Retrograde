// Time looks like
// cycle.revolution
// aka year.month.day
// --> 3002.395
// "The current date is 3002.395"

import { padStart } from "./util";

// Generally it will take 1 day per parsec to travel.

export const REVOLUTIONS_IN_CYCLE = 400;

export type SpaceDate = {
  readonly cycle: number;
  readonly revolution: number;
};

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

export function newSpaceDate(
  cycle: number = 3000,
  revolution: number = 0
): SpaceDate {
  return { cycle, revolution };
}

export function spaceDateToString(spaceDate: SpaceDate): string {
  return `${spaceDate.cycle}.${padStart(
    spaceDate.revolution.toString(),
    "0",
    3
  )}`;
}
