import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { ItemType } from "../../types/ItemType";
import { addItemCount, setItemBaseQuantity } from "../../logic/tradeInventory";

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
  },
});

export const { modifyStationItemCount, setStationBaseQuantity } =
  systemSlice.actions;
export default systemSlice.reducer;
