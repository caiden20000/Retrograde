import { ReactNode } from "react";
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
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectDate,
  selectPlayer,
  selectStation,
  selectSystem,
  selectTravel,
} from "../state/selectors";
import { ErrorPage } from "./error";
import { useDispatch } from "react-redux";
import { addRevs } from "../state/slices/dateSlice";
import { modifyFuel } from "../state/slices/playerSlice";
import {
  replaceAllStations,
  setStationVisited,
} from "../state/slices/systemSlice";
import { setTravel } from "../state/slices/travelSlice";
import { setScreen } from "../state/slices/currentScreenSlice";
import { Tooltip } from "./tooltip";

export function StationMapScreen() {
  const dispatch = useAppDispatch();
  const station = useAppSelector(selectStation);
  const player = useAppSelector(selectPlayer);
  const date = useAppSelector(selectDate);
  const system = useAppSelector(selectSystem);
  const travel = useAppSelector(selectTravel);

  if (station === null) {
    return (
      <ErrorPage
        code="1654321968"
        reason="Attempted to load map on trade screen while station was null (implies traveling)"
      />
    );
  }

  function travelTo(destination: Station) {
    if (station === null)
      throw new Error("Tried to travel while source station is null!");
    const distance = floor(getDistance(station.position, destination.position));
    const timeToTravel = distance;

    let newSystem = runTradeForSystem(system, timeToTravel);
    dispatch(replaceAllStations(newSystem));
    dispatch(
      setTravel(
        newTravel(
          station,
          destination,
          player.ship.fuel,
          player.ship.fuel - Math.floor(distance),
          date,
          timeToTravel
        )
      )
    );

    dispatch(modifyFuel(-Math.floor(distance)));
    dispatch(addRevs(timeToTravel));

    dispatch(setScreen("TravelScreen"));
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
  readonly station: Station;
  readonly player: Player;
  readonly system: System;
  readonly travelTo: (station: Station) => void;
}) {
  const bounds = getBoundsOfSystem(system);
  const maxBound = Math.max(
    bounds.br.x - bounds.tl.x,
    bounds.br.y - bounds.tl.y
  );
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
  readonly station: Station;
  readonly absolutePosition: Vec2;
  readonly distance: number;
  readonly maxTravelDistance: number;
  readonly onTravel: (station: Station) => void;
}) {
  const canTravelTo = distance <= maxTravelDistance;
  const top = absolutePosition.y * 100;
  const left = absolutePosition.x * 100;
  let classname = "current-station";
  if (distance > 0) classname = "reachable-station";
  if (!canTravelTo) classname = "unreachable-station";
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
          disabled={!canTravelTo}
        ></button>
      </Tooltip>
    </div>
  );
}

function stationDistance(station1: Station, station2: Station): number {
  const raw = getDistance(station1.position, station2.position);
  return Math.trunc(raw);
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
