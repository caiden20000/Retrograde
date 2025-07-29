import { useDispatch, useSelector } from "react-redux";
import { allShipTypes, shipType } from "../constants/shipTypes";
import { ShipType } from "../types/ShipType";
import { StationScreenTemplate } from "./station-screen-template";
import { RootState } from "../state/store";
import { changeShip, modifyMoney } from "../state/slices/playerSlice";
import { ShipItem } from "./ship-item";

export function StationShipyardScreen() {
  // const { player, setPlayer } = useGameState();
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  function purchaseShip(shipType: ShipType) {
    dispatch(changeShip(shipType));
    dispatch(modifyMoney(-shipType.baseCost));
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
