import { EncounterNode } from "../types/EncounterNode";
import { set } from "../utils/util";

const node1_2: EncounterNode = {
  description: "Gain money... $1234!",
  options: [
    { label: "Do a thing", sideEffect: null, node: null, nodeType: "null" },
    {
      label: "Do a different thing",
      sideEffect: () => {
        // const { player, setPlayer } = state;
        // setPlayer(set(player, { currency: player.currency + 1234 }));
        // TODO: Determine redux way
      },
      node: null,
      nodeType: "null",
    },
  ],
};

const node1: EncounterNode = {
  description: "Encounter node description...",
  options: [
    { label: "Do a thing", sideEffect: null, node: null, nodeType: "null" },
    {
      label: "Do a different thing",
      sideEffect: null,
      node: node1_2,
      nodeType: "EncounterNode",
    },
  ],
};

export const allEncounters = [node1];
