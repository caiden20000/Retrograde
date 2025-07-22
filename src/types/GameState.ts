import { Battle } from "./Battle";
import { Character } from "./Character";
import { EncounterNode } from "./EncounterNode";
import { ScreenType } from "./ScreenType";
import { SpaceDate } from "./SpaceDate";
import { System } from "./System";
import { Travel } from "./Travel";

export type GameState = {
  player: Character;
  system: System;
  date: SpaceDate;
  currentScreen: ScreenType;
} & (
  | {
      travel: null;
      encounter: null;
    }
  | {
      travel: Travel;
      encounter: EncounterNode | null;
    }
);
