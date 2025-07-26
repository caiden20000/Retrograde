// --- Generated Encounter Imports ---
// You can customize these imports
// ----------------------------------

import { newSideEffect } from "../../logic/sideEffect";
import { EncounterNode } from "../../types/EncounterNode";

const abandoned_cargo__node1_1: EncounterNode = {
  description: `You open the pods only to find them empty. You realize nobody would just abandon valuables anyway.`,
  sideEffect: null,
  options: [
    {
      label: "Continue",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const abandoned_cargo__node1_2: EncounterNode = {
  description: `You find money in the cargo pods! Who would abandon valuables like this?`,
  sideEffect: newSideEffect({ namedEffects: ["smallReward"] }),
  options: [
    {
      label: "Continue",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const abandoned_cargo__node1_3: EncounterNode = {
  description: `You pass by the cargo pods and continue on your way.`,
  sideEffect: null,
  options: [
    {
      label: "Continue",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const abandoned_cargo__node1: EncounterNode = {
  description: `You come across an abandoned cargo pod, floating in space.`,
  sideEffect: null,
  options: [
    {
      label: "Open it",
      outcomes: [
        {
          chance: 1,
          node: abandoned_cargo__node1_1,
          nodeType: "EncounterNode",
        },
        {
          chance: 1,
          node: abandoned_cargo__node1_2,
          nodeType: "EncounterNode",
        },
      ],
    },
    {
      label: "Leave it be",
      outcomes: [
        {
          chance: 1,
          node: abandoned_cargo__node1_3,
          nodeType: "EncounterNode",
        },
      ],
    },
  ],
};

const distress_beacon__node2s: EncounterNode = {
  description: `You manage to scoop up some valuable cargo!`,
  sideEffect: newSideEffect({ namedEffects: ["randomValuables"] }),
  options: [
    {
      label: "Leave before something bad happens",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const distress_beacon__node2f: EncounterNode = {
  description: `You begin to maneuver to pick some of the valuables up. Suddenly, your HUD indicates the pirates' return.`,
  sideEffect: null,
  options: [
    {
      label: "Leave quickly",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const distress_beacon__node2f2: EncounterNode = {
  description: `You drift cautiously closer to the wreckage. Suddenly, a warp wake signals the pirate's return.`,
  sideEffect: null,
  options: [
    {
      label: "Leave quickly",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const distress_beacon__node2_0: EncounterNode = {
  description: `You decide to leave before the pirates come back for their spoils.`,
  sideEffect: null,
  options: [
    {
      label: "Leave quickly",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const distress_beacon__node2: EncounterNode = {
  description: `You see a ship torn to pieces, likely by pirates. There is valuable cargo drifting around the wreckage.`,
  sideEffect: null,
  options: [
    {
      label: "Try to scoop some up",
      outcomes: [
        { chance: 1, node: distress_beacon__node2s, nodeType: "EncounterNode" },
        { chance: 1, node: distress_beacon__node2f, nodeType: "EncounterNode" },
      ],
    },
    {
      label: "Search for survivors",
      outcomes: [
        {
          chance: 1,
          node: distress_beacon__node2f2,
          nodeType: "EncounterNode",
        },
      ],
    },
    {
      label: "Leave before something bad happens",
      outcomes: [
        {
          chance: 1,
          node: distress_beacon__node2_0,
          nodeType: "EncounterNode",
        },
      ],
    },
  ],
};

const distress_beacon__node0: EncounterNode = {
  description: `You continue on your way, ignoring the beacon.`,
  sideEffect: null,
  options: [
    {
      label: "Continue",
      outcomes: [{ chance: 1, node: null, nodeType: "null" }],
    },
  ],
};

const distress_beacon__node1: EncounterNode = {
  description: `You've picked up a distress beacon signal!`,
  sideEffect: null,
  options: [
    {
      label: "Follow the signal",
      outcomes: [
        { chance: 1, node: distress_beacon__node2, nodeType: "EncounterNode" },
      ],
    },
    {
      label: "Ignore the signal",
      outcomes: [
        { chance: 1, node: distress_beacon__node0, nodeType: "EncounterNode" },
      ],
    },
  ],
};

export const allRootNodes = [abandoned_cargo__node1, distress_beacon__node1];
