import { Station } from "../types/Station";
import { Vec2 } from "../types/Vec2";
import { Tooltip } from "./tooltip";
import "../styles/station-dot.css";

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
