import { Battle } from "./Battle";
import { EncounterNode } from "./EncounterNode";

export type EncounterPossibility = {
  chance: number;
} & (
  | {
      readonly node: EncounterNode;
      readonly nodeType: "EncounterNode";
    }
  | {
      readonly node: Battle;
      readonly nodeType: "Battle";
    }
  | {
      readonly node: null;
      readonly nodeType: "null";
    }
);
