import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { addRevolutions } from "../../logic/spaceDate";
import { SpaceDate } from "../../types/SpaceDate";

const dateSlice = createSlice({
  name: "date",
  initialState: initialState().date,
  reducers: {
    addRevs: (state, action: PayloadAction<number>) => {
      return addRevolutions(state, action.payload);
    },
    setDate: (state, action: PayloadAction<SpaceDate>) => {
      return action.payload;
    },
  },
});

export const { addRevs, setDate } = dateSlice.actions;
export default dateSlice.reducer;
