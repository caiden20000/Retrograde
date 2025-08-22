import { Mission } from "../../types/Mission";
import initialState from "../initialState";
import { newGenericSlice } from "./genericSlice";

const missionsSlice = newGenericSlice<Mission[]>(
  "encounter",
  initialState().missions
);

export const { setValue: setMissions } = missionsSlice.actions;
export default missionsSlice.reducer;
