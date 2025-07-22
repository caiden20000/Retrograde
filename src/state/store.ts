import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./slices/playerSlice";
import { newCharacterSlice } from "./slices/characterSlice";
import initialState from "./initialState";
import systemSlice from "./slices/systemSlice";
import dateSlice from "./slices/dateSlice";
import currentScreenSlice from "./slices/currentScreenSlice";
import travelSlice from "./slices/travelSlice";
import encounterSlice from "./slices/encounterSlice";

const store = configureStore({
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
