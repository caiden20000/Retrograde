import { ShipType } from "../types/ShipType";

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
