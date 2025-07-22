import initialState from "../initialState";
import { Travel } from "../../types/Travel";
import { newGenericSlice } from "./genericSlice";
import { EncounterNode } from "../../types/EncounterNode";

const encounterSlice = newGenericSlice<EncounterNode | null>(
  "travel",
  initialState().encounter
);

export const { setValue: setEncounter } = encounterSlice.actions;
export default encounterSlice.reducer;
