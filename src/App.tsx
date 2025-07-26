import { useEffect } from "react";
import { StationFuelScreen } from "./components/station-fuel-screen";
import { StationInfoScreen } from "./components/station-info-screen";
import { StationMapScreen } from "./components/station-map-screen";
import { StationTradeScreen } from "./components/station-trade-screen";
import { TravelScreen } from "./components/travel-screen";
import { Watermark } from "./components/watermark";
import "./styles.css";
import { StationShipyardScreen } from "./components/station-shipyard-screen";
import { RootState, store } from "./state/store";
import { SIMULATED_REVS_BEFORE_START } from "./constants";
import { systemTrade } from "./state/thunks/tradeThunk";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { setStationVisited } from "./state/slices/systemSlice";
import { selectCurrentScreen, selectPlayer } from "./state/selectors";
import { EncounterScreen } from "./components/encounter-screen";

// === Root App ===
export default function App() {
  const screen = useAppSelector(selectCurrentScreen);
  const player = useAppSelector(selectPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(systemTrade(SIMULATED_REVS_BEFORE_START));
    dispatch(setStationVisited(player.location as string));
  }, []);

  return (
    <div className="screen-background">
      <div className="screen-resize-box">
        <div className="screen-box">
          {screen === "StationInfoScreen" && <StationInfoScreen />}
          {screen === "StationTradeScreen" && <StationTradeScreen />}
          {/* {screen === "StationMissionScreen" && <StationMissionScreen />}
            {screen === "StationCrewScreen" && <StationCrewScreen />} */}
          {screen === "StationShipyardScreen" && <StationShipyardScreen />}
          {screen === "StationFuelScreen" && <StationFuelScreen />}
          {screen === "StationMapScreen" && <StationMapScreen />}
          {screen === "TravelScreen" && <TravelScreen />}
          {screen === "EncounterScreen" && <EncounterScreen />}
        </div>
      </div>
      <Watermark />
    </div>
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
