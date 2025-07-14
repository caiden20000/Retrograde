import { useGameState } from "../App";
import { allShipTypes, shipType } from "../constants/shipTypes";
import { ShipType } from "../types/ShipType";
import { StationScreenTemplate } from "./station-screen-template";

export function StationShipyardScreen() {
  const { player } = useGameState();

  function purchaseShip(shipType: ShipType) {
    return;
  }

  const shipList = allShipTypes
    .filter((ship) => ship != player.ship.shipType && ship != shipType.none)
    .map((shipType) => (
      <ShipItem
        shipType={shipType}
        forSale={true}
        canPurchase={player.currency >= shipType.baseCost}
        onPurchase={() => purchaseShip(shipType)}
        key={shipType.name}
      />
    ));

  return (
    <StationScreenTemplate title="Shipyard">
      <div className="ship-listing-header">
        <span className="bold">Your ship:</span>

        <span>Fuel</span>
        <span>Cargo</span>
        <span>Crew</span>
        <span>Equipment</span>
        <span>Attack</span>
        <span>Defense</span>
        <span>Price</span>
      </div>
      <ShipItem
        shipType={player.ship.shipType}
        forSale={false}
        canPurchase={true}
        onPurchase={() => purchaseShip(player.ship.shipType)}
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
  shipType: ShipType;
  forSale: boolean;
  canPurchase: boolean;
  onPurchase: () => void;
}) {
  return (
    <div className="ship-listing">
      <span className="ship-name">{shipType.name}</span>
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
