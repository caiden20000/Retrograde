import initialState from "../initialState";
import { Travel } from "../../types/Travel";
import { newGenericSlice } from "./genericSlice";
import { PayloadAction, UnknownAction, createSlice } from "@reduxjs/toolkit";

// const travelSlice = newGenericSlice<Travel | null>(
//   "travel",
//   initialState().travel
// );

const travelSlice = createSlice({
  name: "travel",
  initialState: initialState().travel,
  reducers: {
    setTravel: (state, action: PayloadAction<Travel | null>) => {
      return action.payload;
    },
    pushElapsed: (state, action: UnknownAction) => {
      if (state === null) return;
      const now = Date.now();
      const elapsed = now - state.startedAt;
      state.alreadyElapsed += elapsed;
    },
    setStartNow: (state, action: UnknownAction) => {
      if (state === null) return;
      const now = Date.now();
      state.startedAt = now;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      if (!state) return;
      state.progress = action.payload;
    },
  },
});

export const { setTravel, pushElapsed, setStartNow, setProgress } =
  travelSlice.actions;
export default travelSlice.reducer;
