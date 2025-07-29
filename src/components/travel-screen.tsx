import { useEffect, useRef, useState } from "react";
import {
  addRevolutions,
  cloneSpaceDate,
  spaceDateToString,
} from "../logic/spaceDate";
import { floor, set } from "../utils/util";
import { StationScreenTemplate } from "./station-screen-template";
import { Statbar } from "./statbar";
import { Player } from "../types/Player";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectPlayer, selectShip, selectTravel } from "../state/selectors";
import { modifyFuel, setFuel, setLocation } from "../state/slices/playerSlice";
import { setDate } from "../state/slices/dateSlice";
import {
  pushElapsed,
  setProgress,
  setStartNow,
  setTravel,
} from "../state/slices/travelSlice";
import { setScreen } from "../state/slices/currentScreenSlice";
import { setStationVisited } from "../state/slices/systemSlice";
import { getRandomEncounter, randomEncounterTrigger } from "../logic/encounter";
import { setEncounter } from "../state/slices/encounterSlice";
import { ENCOUNTER_COOLDOWN_REVS } from "../constants/encounters";
import { ProgressAndFuel } from "./progress-and-fuel";

export function TravelScreen() {
  const dispatch = useAppDispatch();
  const travel = useAppSelector(selectTravel);
  const player = useAppSelector(selectPlayer);
  const progress = travel?.progress ?? 0;
  const [elapsed, setElapsed] = useState<number>(0);
  const [lastEncounterCheck, setLastEncounterCheck] = useState<number>(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      if (travel === null) return;
      const now = Date.now();
      const elapsed = now - travel.startedAt + travel.alreadyElapsed;
      setElapsed(elapsed / 1000);
      const totalDuration = travel.distance * travel.travelSpeed;
      const progress = Math.min(elapsed / totalDuration, 1);
      const animatedValue = progress;

      dispatch(setProgress(progress));
      animationRef.current = requestAnimationFrame(update);

      const currentFuel =
        travel.fuelBefore + (travel.fuelAfter - travel.fuelBefore) * progress;
      const currentRev = floor(travel.timeToTravel * progress);
      const currentDate = addRevolutions(
        cloneSpaceDate(travel.startDate),
        currentRev
      );

      dispatch(setFuel(currentFuel));
      dispatch(setDate(currentDate));

      if (lastEncounterCheck < currentRev) {
        let revDiff;
        // Way easier to assume "=== 0" means resuming travel than calculating correct
        // initial lastEncounterCheck if travel.alreadyElapsed > 0.
        // Only inaccuracy is if there's a revDiff > 1, the chance won't increase
        // for the first encounter check. Doesn't really matter.
        if (lastEncounterCheck === 0) {
          revDiff = 1;
          setLastEncounterCheck(currentRev + ENCOUNTER_COOLDOWN_REVS);
        } else {
          revDiff = currentRev - lastEncounterCheck;
          setLastEncounterCheck(currentRev);
        }
        const check = randomEncounterTrigger(revDiff);
        if (check) encounter();
      }
    };

    animationRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationRef.current);
  }, [travel, lastEncounterCheck]);

  if (travel === null) {
    return <h2>Err: Not traveling!</h2>;
  }

  const currentDistance = floor(travel.distance * progress);

  const arrowAnimation = (speed: number, arrowCount: number) => {
    return ">".repeat(floor((elapsed * speed) % arrowCount) + 1);
  };

  function dock() {
    if (travel === null)
      throw new Error(
        "Location could not be set; travel was null before docking!"
      );
    dispatch(setLocation(travel.to.id));
    dispatch(setStationVisited(travel.to.id));
    dispatch(setTravel(null));
    dispatch(setScreen("StationInfoScreen"));
  }

  function encounter() {
    dispatch(setEncounter(getRandomEncounter()));
    dispatch(pushElapsed());
    dispatch(setScreen("EncounterScreen"));
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
      <ProgressAndFuel {...{ progress, player }} />
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
