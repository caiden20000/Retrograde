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
import { StationList } from "./station-list";

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
