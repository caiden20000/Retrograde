import { Ship } from "./Ship";

export type Player = {
  readonly ship: Ship;
  readonly currency: number;
};
