import { ReactNode } from "react";
import { useGameState } from "../App";
import { Player } from "../types/Player";
import { Station } from "../types/Station";
import { runTradeForSystem } from "../logic/station-trade-manager";
import { System } from "../types/System";
import { addRevolutions } from "../logic/spaceDate";
import { newTravel } from "../logic/travel";
import { floor, set } from "../utils/util";
import { StationScreenTemplate } from "./station-screen-template";
import { cloneVec2, getDistance, newVec2 } from "../logic/vec2";
import { updateStationInSystem } from "../logic/system";
import { Vec2 } from "../types/Vec2";

export function StationMapScreen() {
  const { station, player, setStation, setPlayer, setScreen, system, setSystem, date, setDate, setTravel } =
    useGameState();

  function travelTo(destination: Station) {
    const distance = floor(getDistance(station.position, destination.position));
    const timeToTravel = distance;
    const newShip = set(player.ship, {
      fuel: player.ship.fuel - Math.floor(distance),
    });
    const newPlayer = set(player, { ship: newShip });
    setDate((date) => addRevolutions(date, timeToTravel));
    setPlayer(newPlayer);
    setSystem((system) => {
      let newSystem = runTradeForSystem(system, timeToTravel);
      let newDestination = newSystem.find((station: Station) => station.id === destination.id);
      if (newDestination === undefined) throw new Error("Could not find destination ID in updated system!");
      newDestination = set(newDestination, { visited: true });
      newSystem = updateStationInSystem(newSystem, destination, newDestination);
      setStation(newDestination);
      return newSystem;
    });
    setTravel(newTravel(station, destination, player.ship.fuel, newShip.fuel, date, timeToTravel));
    setScreen("TravelScreen");
  }

  return (
    <StationScreenTemplate title="System Map">
      <StationList {...{ station, player, system, travelTo }} />
    </StationScreenTemplate>
  );
}

export function StationList({
  station,
  player,
  system,
  travelTo,
}: {
  station: Station;
  player: Player;
  system: System;
  travelTo: (station: Station) => void;
}) {
  const center = getCenterOfSystem(system);
  const bounds = getBoundsOfSystem(system);
  const maxBound = Math.max(bounds.br.x - bounds.tl.x, bounds.br.y - bounds.tl.y);
  const scale = newVec2(maxBound, maxBound);

  function absolutePosition(station: Station): Vec2 {
    const pos = newVec2(
      (station.position.x - bounds.tl.x) * (1 / scale.x),
      (station.position.y - bounds.tl.y) * (1 / scale.y)
    );
    return pos;
  }

  function onTravel(station: Station) {
    travelTo(station);
  }

  return (
    <div className="system-dot-map">
      {system.map((stn) => (
        <StationDot
          key={stn.name}
          station={stn}
          absolutePosition={absolutePosition(stn)}
          distance={stationDistance(station, stn)}
          maxTravelDistance={player.ship.fuel}
          onTravel={onTravel}
        />
      ))}
    </div>
  );
}

export function StationDot({
  station,
  absolutePosition,
  distance,
  maxTravelDistance,
  onTravel,
}: {
  station: Station;
  absolutePosition: Vec2;
  distance: number;
  maxTravelDistance: number;
  onTravel: (station: Station) => void;
}) {
  const canTravelTo = maxTravelDistance <= distance;
  const top = absolutePosition.y * 100;
  const left = absolutePosition.x * 100;
  let classname = "current-station";
  if (distance > 0) classname = "reachable-station";
  if (canTravelTo) classname = "unreachable-station";
  const sizeStyle = (pop: number) => ({
    transform: `scale(${1 + (pop - 1) / 4})`,
  });
  return (
    <div
      className={"station-dot" + (station.visited ? "" : " undiscovered")}
      style={{ top: top + "%", left: left + "%" }}
    >
      <Tooltip text={station.visited ? station.name : "??????"}>
        <button
          className={classname}
          style={{ ...sizeStyle(station.populationClass) }}
          onClick={() => onTravel(station)}
          disabled={distance > maxTravelDistance}
        ></button>
      </Tooltip>
    </div>
  );
}

export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <div className="tooltip-container">
      {children} <span className="tooltip-text">{text}</span>
    </div>
  );
}

function stationDistance(station1: Station, station2: Station): number {
  const raw = getDistance(station1.position, station2.position);
  return Math.trunc(raw);
}

function getCenterOfSystem(system: System): Vec2 {
  const sum = newVec2(0, 0);
  for (const station of system) {
    sum.x += station.position.x;
    sum.y += station.position.y;
  }
  const center = newVec2(sum.x / system.length, sum.y / system.length);
  return center;
}

function getBoundsOfSystem(system: System): { tl: Vec2; br: Vec2 } {
  const tl = cloneVec2(system[0].position);
  const br = cloneVec2(system[0].position);
  for (const station of system) {
    if (station.position.x < tl.x) tl.x = station.position.x;
    if (station.position.y < tl.y) tl.y = station.position.y;
    if (station.position.x > br.x) br.x = station.position.x;
    if (station.position.y > br.y) br.y = station.position.y;
  }
  return { tl, br };
}
