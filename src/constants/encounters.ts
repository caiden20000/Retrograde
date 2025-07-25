import { newSideEffect } from "../logic/sideEffect";
import { EncounterOption } from "../types/EcounterOption";
import { EncounterNode } from "../types/EncounterNode";

export const ENCOUNTER_COOLDOWN_REVS = 10;

const endOption = (label: string): EncounterOption[] => [
  {
    label,
    outcomes: [{ chance: 1, node: null, nodeType: "null" }],
  },
];

// Node 1 failure
const node1_1: EncounterNode = {
  description:
    "You open the pods only to find them empty. You realize nobody would just abandon valuables anyway.",
  sideEffect: null,
  options: endOption("Continue"),
};

// Node 1 success
const node1_2: EncounterNode = {
  description:
    "You find money in the cargo pods! Who would abandon valuables like this?",
  sideEffect: newSideEffect({ namedEffects: ["smallReward"] }),
  options: endOption("Continue"),
};

// Node 1 Leave it be
const node1_3: EncounterNode = {
  description: "You pass by the cargo pods and continue on your way.",
  sideEffect: null,
  options: endOption("Continue"),
};

const node1: EncounterNode = {
  description: "You come across an abandoned cargo pod, floating in space.",
  sideEffect: null,
  options: [
    {
      label: "Open it",
      outcomes: [
        {
          chance: 0.5,
          node: node1_1,
          nodeType: "EncounterNode",
        },
        {
          chance: 0.5,
          node: node1_2,
          nodeType: "EncounterNode",
        },
      ],
    },
    {
      label: "Leave it be",
      outcomes: [
        {
          chance: 1,
          node: node1_3,
          nodeType: "EncounterNode",
        },
      ],
    },
  ],
};

export const allEncounters = [node1];
