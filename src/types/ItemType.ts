import { ItemTag } from "./ItemTag";

export type ItemType = {
  readonly name: string;
  readonly weight: number;
  readonly defaultPrice: number;
  readonly tags: ItemTag[];
};
