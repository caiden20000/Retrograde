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
export function set<T extends object>(object: T, attributeValues: StrictPartial<T>): T {
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

// TODO: Floor every non-whole number to first decimal at their source.
// Sources of floats:
//  - Trading in trade screen --> Player currency
//  - Buying fuel --> Fuel amount, player currency
//  - Traveling --> Fuel amount
// Fuel - Integer
// Money - One decimal
// Weight - One decimal
