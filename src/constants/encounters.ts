import { newSideEffect } from "../logic/sideEffect";
import { EncounterOption } from "../types/EcounterOption";
import { EncounterNode } from "../types/EncounterNode";
import { allRootNodes } from "./encounter_gen/generated_encounters";

export const ENCOUNTER_COOLDOWN_REVS = 10;

export const allEncounters = allRootNodes;
