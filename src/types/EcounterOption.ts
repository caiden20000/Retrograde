import { GameState } from "../App";
import { Battle } from "./Battle";
import { EncounterNode } from "./EncounterNode";

export type EncounterOption = {
  readonly label: string;
  readonly sideEffect: ((context: GameState) => void) | null;
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
