import { useEffect, useState } from "react";
import { EncounterNode } from "../types/EncounterNode";
import { EncounterOption } from "../types/EcounterOption";
import { StationScreenTemplate } from "./station-screen-template";
import { doSideEffect } from "../logic/sideEffect";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectEncounter, selectTravel } from "../state/selectors";
import { setScreen } from "../state/slices/currentScreenSlice";
import { setEncounter } from "../state/slices/encounterSlice";
import { setStartNow } from "../state/slices/travelSlice";
import { ProgressAndFuel } from "./travel-screen";
import { chooseOutcome } from "../logic/encounter";
import { applySideEffect } from "../state/thunks/sideEffectThunk";
import { SideEffectList } from "./side-effect";

export function EncounterScreen() {
  const dispatch = useAppDispatch();
  const encounterNode = useAppSelector(selectEncounter);
  const travel = useAppSelector(selectTravel);

  // Do side effect
  useEffect(() => {
    if (encounterNode === null) return;
    if (encounterNode.sideEffect !== null) {
      dispatch(applySideEffect(encounterNode.sideEffect));
    }
  }, [encounterNode]);

  if (encounterNode === null) {
    returnToTravel();
    return <div>Exiting encounter...</div>;
  }

  function returnToTravel() {
    dispatch(setEncounter(null));
    dispatch(setStartNow());
    dispatch(setScreen("TravelScreen"));
  }

  function chooseOption(option: EncounterOption) {
    const result = chooseOutcome(option);

    if (result.nodeType == "null") {
      returnToTravel();
    } else if (result.nodeType == "EncounterNode") {
      dispatch(setEncounter(result.node));
    } else if (result.nodeType == "Battle") {
      // TODO: Trigger battle
    }
  }

  return (
    <StationScreenTemplate title="Encounter!" isTravel>
      <h2>Encounter!</h2>
      <div className="encounter-description">{encounterNode.description}</div>
      {encounterNode.sideEffect !== null && (
        <SideEffectList sideEffect={encounterNode.sideEffect} />
      )}
      <div className="encounter-options">
        {encounterNode.options.map((opt, index) => (
          <button onClick={() => chooseOption(opt)} key={index}>
            {opt.label}
          </button>
        ))}
      </div>
      <ProgressAndFuel progress={travel?.progress ?? 0} />
    </StationScreenTemplate>
  );
}
