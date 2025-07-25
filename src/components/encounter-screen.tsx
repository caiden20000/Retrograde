import { useState } from "react";
import { EncounterNode } from "../types/EncounterNode";
import { EncounterOption } from "../types/EcounterOption";
import { StationScreenTemplate } from "./station-screen-template";
import { doSideEffect } from "../logic/sideEffect";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectEncounter } from "../state/selectors";
import { setScreen } from "../state/slices/currentScreenSlice";
import { setEncounter } from "../state/slices/encounterSlice";
import { setStartNow } from "../state/slices/travelSlice";

export function EncounterScreen() {
  const dispatch = useAppDispatch();
  const encounterNode = useAppSelector(selectEncounter);

  if (encounterNode == null) {
    returnToTravel();
    return <div>Exiting encounter...</div>;
  }

  function returnToTravel() {
    dispatch(setEncounter(null));
    dispatch(setStartNow());
    dispatch(setScreen("TravelScreen"));
  }

  function chooseOption(option: EncounterOption) {
    // Do side effect
    if (option.sideEffect !== null) doSideEffect(option.sideEffect);
    // Change screen
    const next = option.node;
    if (option.nodeType == "null") {
      // TODO: Resume travel
      returnToTravel();
    } else if (option.nodeType == "EncounterNode") {
      // TODO: Change screen
      dispatch(setEncounter(option.node));
    } else if (option.nodeType == "Battle") {
      // TODO: Trigger battle
    }
  }

  return (
    <StationScreenTemplate title="Encounter!">
      <h2>Encounter!</h2>
      <div className="description">{encounterNode.description}</div>
      <div className="options">
        {encounterNode.options.map((opt) => (
          <button onClick={() => chooseOption(opt)}>{opt.label}</button>
        ))}
      </div>
    </StationScreenTemplate>
  );
}
