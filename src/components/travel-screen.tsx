import { useEffect, useRef, useState } from "react";
import { useGameState } from "../App";
import {
  addRevolutions,
  cloneSpaceDate,
  spaceDateToString,
} from "../logic/spaceDate";
import { floor, set } from "../utils/util";
import { StationScreenTemplate } from "./station-screen-template";

export function TravelScreen() {
  const { player, setPlayer, travel, setTravel, setScreen, date, setDate } =
    useGameState();
  const [progress, setProgress] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      if (travel === null) return;
      const now = Date.now();
      const elapsed = now - travel.startedAt;
      setElapsed(elapsed / 1000);
      const duration = travel.distance * travel.travelSpeed;
      const progress = Math.min(elapsed / duration, 1);
      const animatedValue = progress;

      setProgress(animatedValue);
      animationRef.current = requestAnimationFrame(update);

      const currentFuel =
        travel.fuelBefore + (travel.fuelAfter - travel.fuelBefore) * progress;
      const currentDate = addRevolutions(
        cloneSpaceDate(travel.startDate),
        floor(travel.timeToTravel * progress)
      );

      setPlayer(set(player, { ship: set(player.ship, { fuel: currentFuel }) }));
      setDate(currentDate);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationRef.current);
  }, [travel]);

  if (travel === null) {
    return <h2>Err: Not traveling!</h2>;
  }

  const currentDistance = floor(travel.distance * progress);

  const arrowAnimation = (speed: number, arrowCount: number) => {
    return ">".repeat(floor((elapsed * speed) % arrowCount) + 1);
  };

  function dock() {
    setTravel(null);
    setScreen("StationInfoScreen");
  }

  return (
    <StationScreenTemplate title="Traveling..." isTravel={true}>
      <h2 className="travel-title">
        <span>{travel.from.name}</span> <span>{arrowAnimation(2, 4)}</span>
        <span>{travel.to.name}</span>
      </h2>
      <div>
        <div className="travel-info">
          <div>
            <span>Distance: </span>
            <span>{currentDistance}ps</span>
          </div>
        </div>
      </div>
      <div className="bar-container">
        <h3>Progress:</h3>
        <ProgressBar percentage={progress} />
      </div>
      <div className="bar-container">
        <h3>Fuel:</h3>
        <Statbar
          percentage={player.ship.fuel / player.ship.shipType.fuelCapacity}
        />
      </div>
      <button
        className="dock-button"
        hidden={progress < 1}
        onClick={() => dock()}
      >
        Dock station
      </button>
    </StationScreenTemplate>
  );
}

function ProgressBar({ percentage }: { readonly percentage: number }) {
  return (
    <div className="travelbar">
      <div
        className="travelbar-fill"
        style={{ width: percentage * 100 + "%" }}
      ></div>
    </div>
  );
}

function Statbar({ percentage }: { readonly percentage: number }) {
  return (
    <div className="statbar">
      <div
        className="statbar-fill"
        style={{ width: percentage * 100 + "%" }}
      ></div>
    </div>
  );
}
