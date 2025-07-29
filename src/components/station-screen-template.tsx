import { spaceDateToString } from "../logic/spaceDate";
import { useAppSelector } from "../state/hooks";
import {
  selectCurrentScreen,
  selectDate,
  selectPlayer,
  selectStation,
} from "../state/selectors";
import { floor } from "../utils/util";
import { ScreenNavBar } from "./screen-nav-bar";
import "../styles/station-screen-template.css";

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
