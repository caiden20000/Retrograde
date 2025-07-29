import { getDistance, cloneVec2 } from "../logic/vec2";
import { Station } from "../types/Station";
import { System } from "../types/System";
import { Vec2 } from "../types/Vec2";

export function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// https://stackoverflow.com/a/2901298
export function commatize(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function randomItems<T>(list: T[], count: number): T[] {
  if (count > list.length) throw new Error("Not enough items to pick from.");
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function shuffle<T>(array: T[]): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export type StrictPartial<T> = {
  [K in keyof T]: Pick<T, K>;
}[keyof T] &
  Partial<T>;

/** Immutable update: Returns a clone of the object with the new attribute value. */
export function setAttribute<T extends object, K extends keyof T>(
  object: T,
  attributeName: K,
  attributeValue: T[K]
): T {
  return { ...object, [attributeName]: attributeValue };
}

/** Immutable update: Returns a clone of the object with the new attribute values.
 * Example usage: `set(player, {currency: 100})`
 */
export function set<T extends object>(
  object: T,
  attributeValues: StrictPartial<T>
): T {
  return { ...object, ...attributeValues };
}

/** Floors number */
export function trunc0(num: number) {
  return Math.trunc(num);
}

/** Floors to first decimal */
export function trunc1(num: number) {
  return Math.trunc(num * 10) / 10;
}

export function floor(num: number, dec: number = 0) {
  if (dec === 0) return Math.trunc(num);
  const mag = 10 ** dec;
  return Math.trunc(num * mag) / mag;
}

export function padStart(str: string, padding: string, length: number): string {
  if (str.length >= length) return str;
  const padLength = length - str.length;
  const prePad = padding.repeat(Math.ceil(padLength / padding.length));
  const paddedString = prePad.slice(0, padLength) + str;
  return paddedString;
}

export function colorByValue(value: number, invert: boolean = false) {
  if (invert) value *= -1;
  if (value > 0) return "value-up";
  if (value < 0) return "value-down";
  return "";
}

export function addSign(num: number) {
  if (num > 0) return "+";
  if (num < 0) return "-";
  return "";
}

export function stationDistance(station1: Station, station2: Station): number {
  const raw = getDistance(station1.position, station2.position);
  return Math.trunc(raw);
}

export function getBoundsOfSystem(system: System): { tl: Vec2; br: Vec2 } {
  const tl = cloneVec2(system[0].position);
  const br = cloneVec2(system[0].position);
  for (const station of system) {
    if (station.position.x < tl.x) tl.x = station.position.x;
    if (station.position.y < tl.y) tl.y = station.position.y;
    if (station.position.x > br.x) br.x = station.position.x;
    if (station.position.y > br.y) br.y = station.position.y;
  }
  return { tl, br };
}
