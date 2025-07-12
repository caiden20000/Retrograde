import React, {
  useRef,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { initTestPlayer, newPlayer, Player } from "./classes/player";
import { ScreenType } from "./classes/screen-type";
import { newStation, Station } from "./classes/station";
import { runTradeForSystem } from "./classes/station-trade-manager";
import {
  generateSystem,
  System,
  updateStationInSystem,
} from "./classes/system";
import { newSpaceDate, SpaceDate } from "./classes/time";
import { Travel } from "./classes/travel";
import { set } from "./classes/util";
import { StationCrewScreen } from "./components/station-crew-screen";
import { StationFuelScreen } from "./components/station-fuel-screen";
import { StationInfoScreen } from "./components/station-info-screen";
import { StationMapScreen } from "./components/station-map-screen";
import { StationMissionScreen } from "./components/station-mission-screen";
import { StationScreenTemplate } from "./components/station-screen-template";
import { StationTradeScreen } from "./components/station-trade-screen";
import { TravelScreen } from "./components/travel-screen";
import { Watermark } from "./components/watermark";
import "./styles.css";

// === Types ===
type useStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

// === Global Game State Context ===
const GameStateContext = createContext<{
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  station: Station;
  setStation: useStateSetter<Station>;
  player: Player;
  setPlayer: useStateSetter<Player>;
  system: System;
  setSystem: useStateSetter<System>;
  date: SpaceDate;
  setDate: useStateSetter<SpaceDate>;
  travel: Travel | null;
  setTravel: useStateSetter<Travel | null>;
} | null>(null);

export function useGameState() {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("GameStateContext not found");
  return ctx;
}

// === Root App ===
export default function App() {
  const [screen, setScreen] = useState<ScreenType>("StationInfoScreen");
  const [system, setSystem] = useState<System>(generateSystem(30));
  const [station, setStation] = useState<Station>(system[0]);
  const [player, setPlayer] = useState<Player>(initTestPlayer());
  const [date, setDate] = useState<SpaceDate>(newSpaceDate(3000, 0));
  const [travel, setTravel] = useState<Travel | null>(null);

  useEffect(() => {
    const simulatedDaysBeforeStart = 1000;
    setSystem((system) => {
      let newSystem = runTradeForSystem(system, simulatedDaysBeforeStart);
      let newStation = newSystem.find((station) => station.id === station.id);
      if (newStation === undefined)
        throw new Error("Could not find station ID in updated system!");
      newStation = set(newStation, { visited: true });
      newSystem = updateStationInSystem(newSystem, station, newStation);
      setStation(newStation);
      return newSystem;
    });
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        screen,
        setScreen,
        station,
        setStation,
        player,
        setPlayer,
        system,
        setSystem,
        date,
        setDate,
        travel,
        setTravel,
      }}
    >
      <div className="screen-background">
        <div className="screen-resize-box">
          <div className="screen-box">
            {screen === "StationInfoScreen" && <StationInfoScreen />}
            {screen === "StationTradeScreen" && <StationTradeScreen />}
            {/* {screen === "StationMissionScreen" && <StationMissionScreen />}
            {screen === "StationCrewScreen" && <StationCrewScreen />} */}
            {screen === "StationFuelScreen" && <StationFuelScreen />}
            {screen === "StationMapScreen" && <StationMapScreen />}
            {screen === "TravelScreen" && <TravelScreen />}
          </div>
        </div>
        <Watermark />
      </div>
    </GameStateContext.Provider>
  );
}

// https://excalidraw.com/#json=21hO1iQuXzby1-K1-d3z5,MFeUHBf1uDwpMwsOp_jPDg

// === Bugs ===
// In System map, tooltip is obstructed by (undiscovered) stations and the top of the UI box.

// === TODO ===
// = Code =
// Transition ItemType and ShipType from objects to enums with lookups
//    - Should save memory + be more consistent?
//
// = Features =
// Ship screen
// Missions screen
// Crew screen
// Encounters
// Map screen trade price chart
// Add funds to top bar

/*
What do I call it?
It is a space game
> The Space Game
No, already taken.
So, it has trading, it will have battles and factions and missions and crew.
But right now it has trading.
What can I call it right now?
> Space Trader
> StarMonger
> Drifter (FCKING TAKEN ALREADY)
> Final Frontier (Omage to Frontier)
Frontier Last Space Star Trader Monger Drifter Mist Cloud Nebula
Rogue Captain Commander Wolf Fierce Legend Constellation
> Last Frontier: Commander
> Rogue Commander: Last Frontier
> Nebula Drifter
Void Rift Expanse Burn Orbit Wake Reach Span Nomad Skiff Wayfarer Echo Relay
Retrograde Periapsis Maneuver
> Retrograde
*/
