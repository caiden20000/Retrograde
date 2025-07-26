/*
Encounter types
- Abandoned ship
    - Actually abandoned
    - Trap
- Distress beacon
    - Need fuel
    - Need saving from bandits
    - Need rescuing from damaged ship (+crew)
    - Trap
- Space police
    - Contraband search
    - Skirmish if you're wanted
        - Skyrim-like "Pay your bounty or come with us"
- Threat
    - Bandit shakedown
    - Automated killdrones
- Other
    - Asteroid field
        - There is a passing field of asteroids blocking the normal route. You can go through them, or expend extra fuel to travel around.
        - Percentage chance for bad thing to happen if you go through them.
    - Trader peddling wares
        - Random goods selection, wild prices (both high and low)
    - Civilian ship
        - Possibility to attack
        - Being attacked

Encounter attributes
- Initial description
- Branched dialog + common outcomes
    Common outcomes:
        - Currency change
        - Items change
        - Reputation change
        - Crew change
        - Battle
        - Percentage chance
We can make a system where we can define encounters programatically.

Node
    Text
    Options: {{Text, Node} | {Text, Outcome} | Possibities}[]

Possibilities
    outcomes: Outcome[] (possibility adds to 1)
Outcome
    possibility: number
    currencyChange: number
    itemsChange: { [key: ItemType]: number }
    reputationChange: number
    battle: Battle | null
    otherEffects: () => void | null

Battle
    player
    enemyName
    enemyShip (--> ship shields / health)
    enemyCrew
    
    

*/

import { allEncounters } from "../constants/encounters";
import { EncounterOption } from "../types/EcounterOption";
import { EncounterPossibility } from "../types/EncounterPossibility";
import { randomOf } from "../utils/util";

// 1/20 chance per parsec
/** Called per-parsec */
export function randomEncounterTrigger(revs: number = 1): boolean {
  return Math.random() * 20 <= revs;
}

export function getRandomEncounter() {
  return randomOf(allEncounters);
}

export function chooseOutcome(option: EncounterOption): EncounterPossibility {
  let randomValue = Math.random();
  for (const outcome of option.outcomes) {
    if (randomValue <= outcome.chance) return outcome;
    randomValue -= outcome.chance;
  }
  return option.outcomes[0];
  // Throw error because invalid range?
}
