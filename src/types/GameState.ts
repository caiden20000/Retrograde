import { Character } from "./Character";
import { ScreenType } from "./ScreenType";
import { SpaceDate } from "./SpaceDate";
import { System } from "./System";
import { Travel } from "./Travel";

export type GameState = {
  player: Character;
  system: System;
  date: SpaceDate;
  travel: Travel | null;
  currentScreen: ScreenType;
};
