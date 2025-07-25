import { Battle } from "./Battle";
import { EncounterNode } from "./EncounterNode";
import { SideEffect } from "./SideEffect";

export type EncounterOption = {
  readonly label: string;
  readonly sideEffect: SideEffect | null;
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
