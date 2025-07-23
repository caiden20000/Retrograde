import { useDispatch, useSelector } from "react-redux";
import { allShipTypes, shipType } from "../constants/shipTypes";
import { ShipType } from "../types/ShipType";
import { StationScreenTemplate } from "./station-screen-template";
import { RootState } from "../state/store";
import { changeShip, setMoney } from "../state/slices/playerSlice";

export function StationShipyardScreen() {
  // const { player, setPlayer } = useGameState();
  const player = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  function purchaseShip(shipType: ShipType) {
    dispatch(changeShip(shipType));
    dispatch(setMoney(player.money - shipType.baseCost));
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

export function ShipItem({
  shipType,
  forSale,
  canPurchase,
  onPurchase,
}: {
  readonly shipType: ShipType;
  readonly forSale: boolean;
  readonly canPurchase: boolean;
  readonly onPurchase: () => void;
}) {
  return (
    <div className="ship-listing">
      <span className="ship-name bold">{shipType.name}</span>
      <span className="ship-fuel">{shipType.fuelCapacity}ps</span>
      <span className="ship-cargo">{shipType.cargoCapacity}</span>
      <span className="ship-crew">{shipType.crewCapacity}</span>
      <span className="ship-equipment">{shipType.equipment}</span>
      <span className="ship-attack">{shipType.baseAttack}</span>
      <span className="ship-defense">{shipType.baseDefense}</span>
      <span className={"ship-price " + (canPurchase ? "" : "value-down")}>
        ${shipType.baseCost}
      </span>
      <span className="buy-button">
        <button hidden={!forSale} onClick={onPurchase} disabled={!canPurchase}>
          Buy
        </button>
      </span>
    </div>
  );
}
