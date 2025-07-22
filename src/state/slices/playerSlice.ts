import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "../../types/Character";
import initialState from "../initialState";
import { Ship } from "../../types/Ship";
import { Travel } from "../../types/Travel";
import { Station } from "../../types/Station";

const playerSlice = createSlice({
  name: "player",
  initialState: initialState().player,
  reducers: {
    addMoney: (state, action: PayloadAction<number>) => {
      state.money + action.payload;
    },
    setShip: (state, action: PayloadAction<Ship>) => {
      state.ship = action.payload;
    },
    setLocation: (state, action: PayloadAction<Station | Travel>) => {
      state.location = action.payload;
    },
  },
});

export const { addMoney, setShip, setLocation } = playerSlice.actions;
export default playerSlice.reducer;
