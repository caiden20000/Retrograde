import { Station } from "../types/Station";
import { runTradeForSystem } from "../logic/station-trade-manager";
import { newTravel } from "../logic/travel";
import { floor } from "../utils/util";
import { StationScreenTemplate } from "./station-screen-template";
import { getDistance } from "../logic/vec2";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectDate,
  selectPlayer,
  selectStation,
  selectSystem,
  selectTravel,
} from "../state/selectors";
import { ErrorPage } from "./error";
import { addRevs } from "../state/slices/dateSlice";
import { modifyFuel } from "../state/slices/playerSlice";
import { replaceAllStations } from "../state/slices/systemSlice";
import { setTravel } from "../state/slices/travelSlice";
import { setScreen } from "../state/slices/currentScreenSlice";
import { StationList } from "./station-list";
import "../styles/station-map-screen.css";
import StationMapGoodsList from "./station-map-goods-list";

export function StationMapScreen() {
  const dispatch = useAppDispatch();
  const station = useAppSelector(selectStation);
  const player = useAppSelector(selectPlayer);
  const date = useAppSelector(selectDate);
  const system = useAppSelector(selectSystem);

  if (station === null) {
    return (
      <ErrorPage
        code="1654321968"
        reason="Attempted to load map on map screen while station was null (implies traveling)"
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
      <div className="station-map-grid">
        <div className="map">
          <div className="map-inner"><StationList {...{ station, player, system, travelTo }} /></div>
        </div>
        <div className="list"><StationMapGoodsList onSelection={()=>{}}/></div>
        <div className="travel"><button>Travel</button></div>
      </div>
    </StationScreenTemplate>
  );
}
