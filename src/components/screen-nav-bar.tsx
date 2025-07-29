import { ScreenType } from "../types/ScreenType";
import { ScreenNavButton } from "./screen-nav-button";
import "../styles/screen-nav-bar.css";

export function ScreenNavBar({ screen }: { readonly screen: ScreenType }) {
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
