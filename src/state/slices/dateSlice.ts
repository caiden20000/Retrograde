import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";
import { addRevolutions } from "../../logic/spaceDate";

const dateSlice = createSlice({
  name: "date",
  initialState: initialState().date,
  reducers: {
    addRevs: (state, action: PayloadAction<number>) => {
      addRevolutions(state, action.payload);
    },
  },
});

export const { addRevs } = dateSlice.actions;
export default dateSlice.reducer;
