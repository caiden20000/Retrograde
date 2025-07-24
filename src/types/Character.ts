import { CharacterSkills } from "./CharacterSkills";
import { Ship } from "./Ship";
import { Station } from "./Station";
import { Travel } from "./Travel";

export type Character = {
  name: string;
  skills: CharacterSkills;
  money: number;
  ship: Ship | null; // Owned ship. If crew, ship is null.
  location: string | Travel; // string is station ID
};
