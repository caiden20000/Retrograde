import { ThunkAction, UnknownAction, configureStore } from "@reduxjs/toolkit";
import playerSlice from "./slices/playerSlice";
import systemSlice from "./slices/systemSlice";
import dateSlice from "./slices/dateSlice";
import currentScreenSlice from "./slices/currentScreenSlice";
import travelSlice from "./slices/travelSlice";
import encounterSlice from "./slices/encounterSlice";
import { GameState } from "../types/GameState";

export const store = configureStore({
  reducer: {
    player: playerSlice,
    system: systemSlice,
    date: dateSlice,
    currentScreen: currentScreenSlice,
    travel: travelSlice,
    encounter: encounterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

// Verify the store matches our GameState type.
const _stateTypeCheck = store.getState() satisfies GameState;
