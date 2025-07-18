import { EncounterOption } from "./EcounterOption";

export type EncounterNode = {
  readonly description: string;
  readonly options: EncounterOption[];
};
