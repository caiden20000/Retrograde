import { newSideEffect } from "../../logic/sideEffect";
import { EncounterNode } from "../../types/EncounterNode";
const abandoned_cargo__node1_1: EncounterNode = {
  description: `You open the pods only to find them empty. You realize nobody would just abandon valuables anyway.`,
  sideEffect: null,
  options: [
  {
      label: "Continue",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const abandoned_cargo__node1_2: EncounterNode = {
  description: `You find money in the cargo pods! Who would abandon valuables like this?`,
  sideEffect: newSideEffect({ namedEffects: ["smallReward" ] }),
  options: [
  {
      label: "Continue",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const abandoned_cargo__node1_3: EncounterNode = {
  description: `You pass by the cargo pods and continue on your way.`,
  sideEffect: null,
  options: [
  {
      label: "Continue",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const abandoned_cargo__node1: EncounterNode = {
  description: `You come across an abandoned cargo pod, floating in space.`,
  sideEffect: null,
  options: [
  {
      label: "Open it",
      outcomes: [
        { chance: 1, node: abandoned_cargo__node1_1, nodeType: "EncounterNode" },
        { chance: 1, node: abandoned_cargo__node1_2, nodeType: "EncounterNode" }
      ]
    },
  {
      label: "Leave it be",
      outcomes: [
        { chance: 1, node: abandoned_cargo__node1_3, nodeType: "EncounterNode" }
      ]
    }
  ]
};

const distress_beacon__node2s: EncounterNode = {
  description: `You manage to scoop up some valuable cargo!`,
  sideEffect: newSideEffect({ namedEffects: ["randomValuables" ] }),
  options: [
  {
      label: "Leave before something bad happens",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const distress_beacon__node2f: EncounterNode = {
  description: `You begin to maneuver to pick some of the valuables up. Suddenly, your HUD indicates the pirates' return.`,
  sideEffect: null,
  options: [
  {
      label: "Leave quickly",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const distress_beacon__node2f2: EncounterNode = {
  description: `You drift cautiously closer to the wreckage. Suddenly, a warp wake signals the pirate's return.`,
  sideEffect: null,
  options: [
  {
      label: "Leave quickly",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const distress_beacon__node2_0: EncounterNode = {
  description: `You decide to leave before the pirates come back for their spoils.`,
  sideEffect: null,
  options: [
  {
      label: "Leave quickly",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const distress_beacon__node2: EncounterNode = {
  description: `You see a ship torn to pieces, likely by pirates. There is valuable cargo drifting around the wreckage.`,
  sideEffect: null,
  options: [
  {
      label: "Try to scoop some up",
      outcomes: [
        { chance: 1, node: distress_beacon__node2s, nodeType: "EncounterNode" },
        { chance: 1, node: distress_beacon__node2f, nodeType: "EncounterNode" }
      ]
    },
  {
      label: "Search for survivors",
      outcomes: [
        { chance: 1, node: distress_beacon__node2f2, nodeType: "EncounterNode" }
      ]
    },
  {
      label: "Leave before something bad happens",
      outcomes: [
        { chance: 1, node: distress_beacon__node2_0, nodeType: "EncounterNode" }
      ]
    }
  ]
};

const distress_beacon__node0: EncounterNode = {
  description: `You continue on your way, ignoring the beacon.`,
  sideEffect: null,
  options: [
  {
      label: "Continue",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const distress_beacon__node1: EncounterNode = {
  description: `You've picked up a distress beacon signal!`,
  sideEffect: null,
  options: [
  {
      label: "Follow the signal",
      outcomes: [
        { chance: 1, node: distress_beacon__node2, nodeType: "EncounterNode" }
      ]
    },
  {
      label: "Ignore the signal",
      outcomes: [
        { chance: 1, node: distress_beacon__node0, nodeType: "EncounterNode" }
      ]
    }
  ]
};

const goodguy1__root_s: EncounterNode = {
  description: `You haul over some food and water rations. They are so grateful, they give you money in return!`,
  sideEffect: newSideEffect({ namedEffects: ["smallReward" ] }),
  options: [
  {
      label: "Fantastic!",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy1__root_f: EncounterNode = {
  description: `You haul over some food and water rations. They thank you profusely, and apologize for not having anything to trade with.
That warm feeling you got should be enough, right?`,
  sideEffect: null,
  options: [
  {
      label: "I guess...",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy1__end: EncounterNode = {
  description: `You hang up and fly away. They were probably trying to scam you anyway.`,
  sideEffect: null,
  options: [
  {
      label: "Leave",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy1__root: EncounterNode = {
  description: `You notice a ship in distress. They call you over comms and ask for food and water.`,
  sideEffect: null,
  options: [
  {
      label: "Give them some supplies",
      outcomes: [
        { chance: 1, node: goodguy1__root_s, nodeType: "EncounterNode" },
        { chance: 1, node: goodguy1__root_f, nodeType: "EncounterNode" }
      ]
    },
  {
      label: "Ignore them",
      outcomes: [
        { chance: 1, node: goodguy1__end, nodeType: "EncounterNode" }
      ]
    }
  ]
};

const goodguy2__root_s1: EncounterNode = {
  description: `You siphon off some of your fuel to the crew of the stalled ship.
They're so grateful that they bestow a gift upon you!`,
  sideEffect: newSideEffect({ namedEffects: ["loseFuel", "smallReward" ] }),
  options: [
  {
      label: "Wonderful!",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy2__root_s2: EncounterNode = {
  description: `You siphon off some of your fuel to the crew of the stalled ship.
They're so grateful that they bestow a gift upon you!`,
  sideEffect: newSideEffect({ namedEffects: ["loseFuel", "randomValuables" ] }),
  options: [
  {
      label: "Fantastic!",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy2__root_f: EncounterNode = {
  description: `You siphon off some of your fuel to the crew of the stalled ship.
They are very thankful and apologetic that they have nothing to give in return.`,
  sideEffect: newSideEffect({ namedEffects: ["loseFuel" ] }),
  options: [
  {
      label: "Just doing what's right.",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy2__leave1: EncounterNode = {
  description: `You express sympathy and explain that you can't afford to lose any more fuel.
The poor captain begins to cry.
You quickly stop the comms before you change your mind.`,
  sideEffect: null,
  options: [
  {
      label: "That was strange.",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy2__leave2: EncounterNode = {
  description: `You express sympathy and explain that you can't afford to lose any more fuel.
The captain bids you well, and you continue your journey.`,
  sideEffect: null,
  options: [
  {
      label: "Onwards",
      outcomes: [
        { chance: 1, node: null, nodeType: "null" }
      ]
    }
  ]
};

const goodguy2__root: EncounterNode = {
  description: `You notice a ship nearby that just put on its distress beacon.
After initiating comms, the captain explains they are out of fuel.`,
  sideEffect: null,
  options: [
  {
      label: "Give some of your fuel to them",
      outcomes: [
        { chance: 1, node: goodguy2__root_s1, nodeType: "EncounterNode" },
        { chance: 1, node: goodguy2__root_s2, nodeType: "EncounterNode" },
        { chance: 1, node: goodguy2__root_f, nodeType: "EncounterNode" }
      ]
    },
  {
      label: "Provide nothing",
      outcomes: [
        { chance: 1, node: goodguy2__leave1, nodeType: "EncounterNode" },
        { chance: 1, node: goodguy2__leave2, nodeType: "EncounterNode" }
      ]
    }
  ]
};

export const allRootNodes = [abandoned_cargo__node1, distress_beacon__node1, goodguy1__root, goodguy2__root];
