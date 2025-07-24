import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "../../types/Character";
import initialState from "../initialState";
import { Ship } from "../../types/Ship";
import { Travel } from "../../types/Travel";
import { Station } from "../../types/Station";
import { newCharacterSlice } from "./characterSlice";

const playerSlice = newCharacterSlice("player", initialState().player);

export const {
  modifyMoney,
  setLocation,
  setName,
  changeShip,
  modifyItemCount: modifyPlayerItemCount,
  modifyFuel,
  setFuel,
} = playerSlice.actions;
export default playerSlice.reducer;
