import initialState from "../initialState";
import { Travel } from "../../types/Travel";
import { newGenericSlice } from "./genericSlice";

const travelSlice = newGenericSlice<Travel | null>(
  "travel",
  initialState().travel
);

export const { setValue: setTravel } = travelSlice.actions;
export default travelSlice.reducer;
