import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { ScreenType } from "../../types/ScreenType";

const currentScreenSlice = createSlice({
  name: "currentScreen",
  initialState: initialState().currentScreen,
  reducers: {
    setScreen: (state, action: PayloadAction<ScreenType>) => {
      return action.payload;
    },
  },
});

export const { setScreen } = currentScreenSlice.actions;
export default currentScreenSlice.reducer;
