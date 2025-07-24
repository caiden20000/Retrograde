import { Character } from "./Character";
import { Ship } from "./Ship";

// export type Player = {
//   readonly ship: Ship;
//   readonly currency: number;
// };

export type Player = Character & { ship: Ship };
