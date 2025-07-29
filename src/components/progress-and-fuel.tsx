import { useAppSelector } from "../state/hooks";
import { selectPlayer } from "../state/selectors";
import { Statbar } from "./statbar";
import "../styles/progress-and-fuel.css";

export function ProgressAndFuel({ progress }: { progress: number }) {
  const player = useAppSelector(selectPlayer);
  return (
    <div>
      <div className="bar-container">
        <h3>Progress:</h3>
        <Statbar
          backgroundColor="rgb(51, 50, 68)"
          barColor="rgb(110, 115, 242)"
          percentage={progress}
        />
      </div>
      <div className="bar-container">
        <h3>Fuel:</h3>
        <Statbar
          backgroundColor="rgb(211, 211, 211)"
          barColor="rgb(224, 218, 104)"
          percentage={player.ship.fuel / player.ship.shipType.fuelCapacity}
        />
      </div>
    </div>
  );
}
