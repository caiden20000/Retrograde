import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./slices/playerSlice";

const store = configureStore({
  reducer: {
    player: playerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
