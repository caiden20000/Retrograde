import { newVec2 } from "../logic/vec2";
import { Player } from "../types/Player";
import { Station } from "../types/Station";
import { System } from "../types/System";
import { Vec2 } from "../types/Vec2";
import { getBoundsOfSystem, stationDistance } from "../utils/util";
import { StationDot } from "./station-dot";
import "../styles/station-list.css";
import { useEffect, useRef } from "react";

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
  let borderLR = [0.05, 0.1];
  let borderTB = [0.05, 0.1];

  function absolutePosition(station: Station): Vec2 {
    const pos = newVec2(
      (station.position.x - bounds.tl.x + borderLR[0]) * (1 / scale.x),
      (station.position.y - bounds.tl.y + borderTB[0]) * (1 / scale.y)
    );
    const bordered = newVec2(
      (pos.x * (1 - (borderLR[0]+borderLR[1]))) + (borderLR[0]),
      (pos.y * (1 - (borderTB[0]+borderTB[1]))) + (borderTB[0]),
    )
    return bordered;
  }

  function onTravel(station: Station) {
    travelTo(station);
  }

  const starDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (starDivRef.current === null) return; 
    let a="";
    // Consts are pre-balanced to generally fill the space.
    const starCount = 30000;
    const starRarity = 0.99;
    for(let i=0;i<starCount;i++)a+=Math.random()>starRarity?".":" ";
    starDivRef.current.setAttribute("stars", a);
  }, [starDivRef]);

  return (
    <div className="system-dot-map" ref={starDivRef}>
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
