import { useState } from "react";
import { EncounterNode } from "../types/EncounterNode";
import { EncounterOption } from "../types/EcounterOption";
import { StationScreenTemplate } from "./station-screen-template";

export function EncounterScreen({
  initialEncounterNode,
}: {
  initialEncounterNode: EncounterNode;
}) {
  const [encounterNode, setEncounterNode] =
    useState<EncounterNode>(initialEncounterNode);

  function chooseOption(option: EncounterOption) {
    // Do side effect
    if (option.sideEffect !== null) option.sideEffect();
    // Change screen
    const next = option.node;
    if (option.nodeType == "null") {
      // TODO: Resume travel
    } else if (option.nodeType == "EncounterNode") {
      // TODO: Change screen
      setEncounterNode(option.node);
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
