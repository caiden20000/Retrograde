import { useGameState } from "../App";
import { capitalize, commatize } from "../classes/util";
import { StationScreenTemplate } from "./station-screen-template";

export function StationInfoScreen() {
  const { station } = useGameState();
  return (
    <StationScreenTemplate title="Station Info">
      <div className="station-info">
        <p>Welcome to {station.name}.</p>
        <table>
          <tbody>
            <tr>
              <th>Type:</th>
              <td>{capitalize(station.type)}</td>
            </tr>
            <tr>
              <th>Industry:</th>
              <td>{capitalize(station.industry)}</td>
            </tr>
            <tr>
              <th>Population:</th>
              <td>{commatize(station.population)}</td>
            </tr>
          </tbody>
        </table>
        <p>{station.flavor}</p>
      </div>
    </StationScreenTemplate>
  );
}

/*
What could be on an info page?
- Main goods/services provided
    - Like the industry
- Population
- Location
- Flavortext description
    - Like: "A small depot built to service the local mining industry."
- Faction alignment
*/
