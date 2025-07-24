import { shipType } from "../../constants/shipTypes";
import { Station } from "../../types/Station";
import { RootState } from "../store";

export function selectPlayer(state: RootState) {
  return state.player;
}

export function selectStation(state: RootState): Station | null {
  const loc = state.player.location;
  if (typeof loc == "object") {
    return null;
  }
  return state.system.find((stn) => stn.id == loc) ?? null;
}

export function selectSystem(state: RootState) {
  return state.system;
}

export function selectDate(state: RootState) {
  return state.date;
}

export function selectCurrentScreen(state: RootState) {
  return state.currentScreen;
}

export function selectTravel(state: RootState) {
  return state.travel;
}

export function selectShip(state: RootState) {
  return state.player.ship ?? shipType.none;
}
