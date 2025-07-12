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
