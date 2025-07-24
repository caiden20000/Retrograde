import { spaceDateToString } from "../logic/spaceDate";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectCurrentScreen,
  selectDate,
  selectPlayer,
  selectStation,
} from "../state/selectors";
import { setScreen } from "../state/slices/currentScreenSlice";
import { ScreenType } from "../types/ScreenType";
import { floor } from "../utils/util";

export function StationScreenTemplate({
  title,
  children,
  isTravel,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly isTravel?: boolean;
}) {
  const station = useAppSelector(selectStation);
  const date = useAppSelector(selectDate);
  const player = useAppSelector(selectPlayer);
  const screen = useAppSelector(selectCurrentScreen);

  return (
    <div className="station-template">
      <div className="station-header">
        <div className="perm-header">
          <span className="station-name">
            {isTravel || station === null ? "Space" : station.name}
          </span>
          <span className="funds">Funds: ${floor(player.money, 1)}</span>
          <span className="space-date">Date: {spaceDateToString(date)}</span>
        </div>
        {title}
      </div>
      <div className="station-content">{children}</div>
      {!isTravel && <ScreenNavBar {...{ screen }} />}
    </div>
  );
}

function ScreenNavBar({ screen }: { readonly screen: ScreenType }) {
  return (
    <div className="station-footer">
      <ScreenNavButton
        navScreen="StationInfoScreen"
        title="Info"
        {...{ screen }}
      />
      <ScreenNavButton
        navScreen="StationTradeScreen"
        title="Trade"
        {...{ screen }}
      />
      <ScreenNavButton
        navScreen="StationShipyardScreen"
        title="Shipyard"
        {...{ screen }}
      />
      {/* <ScreenNavButton
    navScreen="StationMissionScreen"
    title="Missions"
    {...{ screen, setScreen }}
  />
  <ScreenNavButton
    navScreen="StationCrewScreen"
    title="Crew"
    {...{ screen, setScreen }}
  /> */}
      <ScreenNavButton
        navScreen="StationFuelScreen"
        title="Refuel"
        {...{ screen }}
      />
      <ScreenNavButton
        navScreen="StationMapScreen"
        title="Map"
        {...{ screen }}
      />
    </div>
  );
}

function ScreenNavButton({
  navScreen,
  screen,
  title,
}: {
  readonly navScreen: ScreenType;
  readonly screen: ScreenType;
  readonly title: string;
}) {
  const dispatch = useAppDispatch();
  return (
    <button
      className={screen == navScreen ? "selected" : ""}
      onClick={() => dispatch(setScreen(navScreen))}
    >
      {title}
    </button>
  );
}
