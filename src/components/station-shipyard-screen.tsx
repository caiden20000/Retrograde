import { useGameState } from "../App";
import { allItemTypes } from "../constants/itemTypes";
import { allShipTypes, shipType } from "../constants/shipTypes";
import {
  addItemCount,
  cloneInventory,
  getItemCount,
  getTotalWeight,
  newInventory,
  reduceTo,
} from "../logic/inventory";
import { getCargoUsage, newShip } from "../logic/ship";
import { ShipType } from "../types/ShipType";
import { set } from "../utils/util";
import { StationScreenTemplate } from "./station-screen-template";

export function StationShipyardScreen() {
  const { player, setPlayer } = useGameState();

  function purchaseShip(shipType: ShipType) {
    const currentWeight = getCargoUsage(player.ship);
    const newMaxWeight = shipType.cargoCapacity;
    let newShipInventory = cloneInventory(player.ship.inventory);

    newShipInventory = reduceTo(newShipInventory, newMaxWeight);

    let purchasedShip = newShip(shipType);
    purchasedShip = set(purchasedShip, { inventory: newShipInventory });
    let newPlayer = set(player, {
      ship: purchasedShip,
      currency: player.currency - shipType.baseCost,
    });
    setPlayer(newPlayer);
  }

  const shipList = allShipTypes
    .filter((ship) => ship != player.ship.shipType && ship != shipType.none)
    .sort((a, b) => a.baseCost - b.baseCost)
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
