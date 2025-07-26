import { EncounterPossibility } from "./EncounterPossibility";

export type EncounterOption = {
  readonly label: string;
  readonly outcomes: EncounterPossibility[];
};
