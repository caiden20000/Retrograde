// Generate initial state to populate store

import { shipType } from "../constants/shipTypes";
import { initTestPlayer, newPlayer } from "../logic/player";
import { newShip } from "../logic/ship";
import { newSpaceDate } from "../logic/spaceDate";
import { generateSystem } from "../logic/system";
import { Character } from "../types/Character";
import { GameState } from "../types/GameState";

let initStorage: GameState | null = null;
export default function initialState(): GameState {
  if (initStorage !== null) return initStorage;
  const system = generateSystem(32);
  const station = system[0];
  const player: Character = {
    name: "Player",
    skills: {
      trade: 2,
      engineering: 2,
      attack: 2,
      defense: 2,
    },
    money: 10000,
    ship: newShip(shipType.dart),
    location: station,
  };
  const newState: GameState = {
    system,
    player,
    travel: null,
    encounter: null,
    date: newSpaceDate(3000, 0),
    currentScreen: "StationInfoScreen",
  };
  initStorage = newState;
  return newState;
}
