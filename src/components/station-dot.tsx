import { Station } from "../types/Station";
import { Vec2 } from "../types/Vec2";
import { Tooltip } from "./tooltip";
import "../styles/station-dot.css";
import { useAppSelector } from "../state/hooks";
import { selectPlayer, selectStation } from "../state/selectors";

export function StationDot({
  station,
  absolutePosition,
  onTravel,
  color,
  canTravelTo,
  selected
}: {
  readonly station: Station;
  readonly absolutePosition: Vec2;
  readonly onTravel: (station: Station) => void;
  color: string;
  canTravelTo: boolean;
  selected: boolean;
}) {
  const playerStation = useAppSelector(selectStation);
  const top = absolutePosition.y * 100;
  const left = absolutePosition.x * 100;
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
          className={(selected && station != playerStation ? "selected " : "") + (playerStation == station ? "current " : "")}
          style={{ ...sizeStyle(station.populationClass), backgroundColor: color }}
          onClick={() => onTravel(station)}
          disabled={!canTravelTo}
        ></button>
      </Tooltip>
    </div>
  );
}
