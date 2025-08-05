import { newVec2 } from "../logic/vec2";
import { Player } from "../types/Player";
import { Station } from "../types/Station";
import { System } from "../types/System";
import { Vec2 } from "../types/Vec2";
import { getBoundsOfSystem, stationDistance } from "../utils/util";
import { StationDot } from "./station-dot";
import "../styles/station-list.css";

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
  let scale = newVec2(maxBound, maxBound);
  let borderLR = [0.05, 0.05];
  let borderTB = [0.05, 0.05];
  // TODO implement border 

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
