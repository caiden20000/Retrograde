import { useEffect, useRef, useState } from "react";
import { useGameState } from "../App";
import { addRevolutions, cloneSpaceDate, spaceDateToString } from "../logic/spaceDate";
import { floor } from "../utils/util";

export function TravelScreen() {
  const { player, travel, setTravel, setScreen } = useGameState();

  if (travel === null) {
    return <h2>Err: Not traveling!</h2>;
  }

  const [progress, setProgress] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const animationRef = useRef<number>(0);

  const duration = travel.distance * travel.travelSpeed;

  useEffect(() => {
    const update = () => {
      if (travel === null) return;
      const now = Date.now();
      const elapsed = now - travel.startedAt;
      setElapsed(elapsed / 1000);
      const progress = Math.min(elapsed / duration, 1);
      const animatedValue = progress;

      setProgress(animatedValue);
      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationRef.current);
  }, [travel.startedAt, duration]);

  const currentFuel = travel.fuelBefore + (travel.fuelAfter - travel.fuelBefore) * progress;
  const currentDate = addRevolutions(cloneSpaceDate(travel.startDate), floor(travel.timeToTravel * progress));
  const currentDistance = floor(travel.distance * progress);

  const arrowAnimation = (speed: number, arrowCount: number) => {
    return ">".repeat(floor((elapsed * speed) % arrowCount) + 1);
  };

  function dock() {
    setTravel(null);
    setScreen("StationInfoScreen");
  }

  // TODO: Show date changing

  return (
    <div className="travel-screen">
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
          <div>
            <span>Date: </span>
            <span>{spaceDateToString(currentDate)}</span>
          </div>
        </div>
      </div>
      <div className="bar-container">
        <h3>Progress:</h3>
        <ProgressBar percentage={progress} />
      </div>
      <div className="bar-container">
        <h3>Fuel:</h3>
        <Statbar percentage={currentFuel / player.ship.shipType.fuelCapacity} />
      </div>
      <button className="dock-button" hidden={progress < 1} onClick={() => dock()}>
        Dock station
      </button>
    </div>
  );
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="travelbar">
      <div className="travelbar-fill" style={{ width: percentage * 100 + "%" }}></div>
    </div>
  );
}

function Statbar({ percentage }: { percentage: number }) {
  return (
    <div className="statbar">
      <div className="statbar-fill" style={{ width: percentage * 100 + "%" }}></div>
    </div>
  );
}
