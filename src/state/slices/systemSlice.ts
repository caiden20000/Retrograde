import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { ItemType } from "../../types/ItemType";
import { addItemCount, setItemBaseQuantity } from "../../logic/tradeInventory";
import { System } from "../../types/System";

const systemSlice = createSlice({
  name: "system",
  initialState: initialState().system,
  reducers: {
    modifyStationItemCount: (
      state,
      action: PayloadAction<{ id: string; itemType: ItemType; count: number }>
    ) => {
      const { id, itemType, count } = action.payload;
      const station = state.find((stn) => stn.id == id);
      if (station === undefined) return;
      station.tradeInventory = addItemCount(
        station.tradeInventory,
        itemType,
        count
      );
    },
    setStationBaseQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        itemType: ItemType;
        baseQuantity: number;
      }>
    ) => {
      const { id, itemType, baseQuantity } = action.payload;
      const station = state.find((stn) => stn.id == id);
      if (station === undefined) return;
      station.tradeInventory = setItemBaseQuantity(
        station.tradeInventory,
        itemType,
        baseQuantity
      );
    },
    replaceAllStations: (state, action: PayloadAction<System>) => {
      return state.map((stn) => {
        const replace = action.payload.find((stn2) => stn.id == stn2.id);
        if (replace === undefined)
          throw new Error("System replacement failed; ID missing");
        return replace;
      });
    },
    setStationVisited: (state, action: PayloadAction<string>) => {
      const station = state.find((stn) => stn.id == action.payload);
      if (station !== undefined) station.visited = true;
    },
  },
});

export const {
  modifyStationItemCount,
  setStationBaseQuantity,
  replaceAllStations,
  setStationVisited,
} = systemSlice.actions;
export default systemSlice.reducer;
