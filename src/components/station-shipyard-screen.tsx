import { useDispatch, useSelector } from "react-redux";
import { allShipTypes, shipType } from "../constants/shipTypes";
import { ShipType } from "../types/ShipType";
import { StationScreenTemplate } from "./station-screen-template";
import { RootState } from "../state/store";
import { changeShip, modifyMoney } from "../state/slices/playerSlice";
import { ShipItem } from "./ship-item";
import "../styles/station-shipyard-screen.css";
import { calculateReductionLoss, getItemCount } from "../logic/inventory";
import { useModal } from "./modal-provider";
import { allItemTypes } from "../constants/itemTypes";

export function StationShipyardScreen() {
  // const { player, setPlayer } = useGameState();
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  const { queryModalYesNo } = useModal();

  function purchaseShip(shipType: ShipType) {
    const loss = calculateReductionLoss(
      player.ship.inventory,
      shipType.cargoCapacity
    );
    if (loss === null) {
      dispatch(changeShip(shipType));
      dispatch(modifyMoney(-shipType.baseCost));
    } else {
      const lossItems: [string, number][] = [];
      for (const itemType of allItemTypes) {
        const count = getItemCount(loss, itemType);
        if (count !== 0) lossItems.push([itemType.name, count]);
      }
      queryModalYesNo(
        <div className="centered-column">
          <h1>Warning!</h1>
          <p>
            The ship you're purchasing has a smaller cargo hold, and you
            currently have too much cargo! Some cargo would be lost if you buy
            this ship now!
          </p>
          <table className="small-table top-headers">
            <thead>
              <tr>
                <th>Item</th>
                <th>Loss</th>
              </tr>
            </thead>
            <tbody>
              {lossItems.map((entry) => (
                <tr key={entry[0]}>
                  <td>{entry[0]}</td>
                  <td>{entry[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ).then((response) => {
        if (response === true) {
          dispatch(changeShip(shipType));
          dispatch(modifyMoney(-shipType.baseCost));
        }
      });
    }
  }

  const playerShipType = player.ship?.shipType ?? shipType.none;

  const shipList = allShipTypes
    .filter((ship) => ship != playerShipType && ship != shipType.none)
    .sort((a, b) => a.baseCost - b.baseCost)
    .map((shipType) => (
      <ShipItem
        shipType={shipType}
        forSale={true}
        canPurchase={player.money >= shipType.baseCost}
        onPurchase={() => purchaseShip(shipType)}
        key={shipType.name}
      />
    ));

  return (
    <StationScreenTemplate title="Shipyard">
      <div className="ship-listing-header">
        <span className="bold ship-name">Your ship:</span>

        <span>Fuel</span>
        <span>Cargo</span>
        <span>Crew</span>
        <span>Equipment</span>
        <span>Attack</span>
        <span>Defense</span>
        <span>Price</span>
      </div>
      <ShipItem
        shipType={playerShipType}
        forSale={false}
        canPurchase={true}
        onPurchase={() => purchaseShip(playerShipType)}
      />
      <hr />
      {shipList}
    </StationScreenTemplate>
  );
}
