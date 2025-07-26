import { Battle } from "./Battle";
import { Character } from "./Character";
import { EncounterNode } from "./EncounterNode";
import { Player } from "./Player";
import { ScreenType } from "./ScreenType";
import { SpaceDate } from "./SpaceDate";
import { System } from "./System";
import { Travel } from "./Travel";

export type GameState = {
  player: Player;
  system: System;
  date: SpaceDate;
  currentScreen: ScreenType;
  travel: Travel | null;
  encounter: EncounterNode | null;
};

/* 
This is a validated type that would prevent a weird thing from happening, as encounter should not be null when travel is null.
But this makes type validation for the redux store complicated so we'll deprecate it for now.

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
*/
