import { EncounterOption } from "./EcounterOption";
import { SideEffect } from "./SideEffect";

export type EncounterNode = {
  readonly description: string;
  sideEffect: SideEffect | null;
  readonly options: EncounterOption[];
};
