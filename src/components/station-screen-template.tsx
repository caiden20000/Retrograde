import { useGameState } from "../App";
import { spaceDateToString } from "../logic/spaceDate";
import { ScreenType } from "../types/ScreenType";

export function StationScreenTemplate({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { screen, setScreen, station, date, player } = useGameState();

  return (
    <div className="station-template">
      <div className="station-header">
        <div className="perm-header">
          <span className="station-name">{station.name}</span>
          <span className="funds">Funds: ${player.currency}</span>
          <span className="space-date">Date: {spaceDateToString(date)}</span>
        </div>
        {title}
      </div>
      <div className="station-content">{children}</div>
      <div className="station-footer">
        <ScreenNavButton
          navScreen="StationInfoScreen"
          title="Info"
          {...{ screen, setScreen }}
        />
        <ScreenNavButton
          navScreen="StationTradeScreen"
          title="Trade"
          {...{ screen, setScreen }}
        />
        <ScreenNavButton
          navScreen="StationShipyardScreen"
          title="Shipyard"
          {...{ screen, setScreen }}
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
          {...{ screen, setScreen }}
        />
        <ScreenNavButton
          navScreen="StationMapScreen"
          title="Map"
          {...{ screen, setScreen }}
        />
      </div>
    </div>
  );
}

function ScreenNavButton({
  navScreen,
  screen,
  setScreen,
  title,
}: {
  navScreen: ScreenType;
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  title: string;
}) {
  return (
    <button
      className={screen == navScreen ? "selected" : ""}
      onClick={() => setScreen(navScreen)}
    >
      {title}
    </button>
  );
}
