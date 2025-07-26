import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { ScreenType } from "../../types/ScreenType";
import { newGenericSlice } from "./genericSlice";

const currentScreenSlice = newGenericSlice(
  "currentScreen",
  initialState().currentScreen
);

export const { setValue: setScreen } = currentScreenSlice.actions;
export default currentScreenSlice.reducer;
