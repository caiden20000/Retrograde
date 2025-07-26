import { StationScreenTemplate } from "./station-screen-template";
import * as Trd from "../logic/tradeInventory";
import { itemType } from "../constants/itemTypes";
import { updateStationInSystem } from "../logic/system";
import { set, floor } from "../utils/util";
import { Statbar } from "./statbar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectPlayer, selectShip, selectStation } from "../state/selectors";
import { ErrorPage } from "./error";
import { buyFuel } from "../state/thunks/tradeThunk";

export function StationFuelScreen() {
  const dispatch = useAppDispatch();
  const player = useAppSelector(selectPlayer);
  const station = useAppSelector(selectStation);
  const ship = useAppSelector(selectShip);

  if (station === null) {
    return (
      <ErrorPage
        code="981913468"
        reason="Attempted to load fuel page on trade screen while station was null (implies traveling)"
      />
    );
  }

  const funds = player.money;
  const fuelAmount = player.ship.fuel;
  const fuelCapacity = player.ship.shipType.fuelCapacity;
  const emptyFuel = fuelCapacity - fuelAmount;
  const fuelPercentage = fuelAmount / fuelCapacity;

  const stationFuel = Trd.getItemCount(station.tradeInventory, itemType.fuel);
  const fuelPrice = floor(
    Trd.getItemBuyPrice(station.tradeInventory, itemType.fuel),
    1
  );

  function canBuy(fuelAmount: number) {
    const price = fuelAmount * fuelPrice;

    if (fuelAmount > emptyFuel) return false;
    if (fuelAmount > stationFuel) return false;
    if (price > funds) return false;
    return true;
  }

  function buy(fuelAmount: number) {
    if (station === null)
      throw new Error("Tried to buy fuel when station is null!");
    dispatch(buyFuel(station.id, fuelAmount));
  }

  const maxAfford = Math.floor(funds / fuelPrice);
  let maxFuel = emptyFuel;
  maxFuel = Math.min(maxFuel, stationFuel);
  maxFuel = Math.min(maxFuel, maxAfford);
  maxFuel = Math.max(maxFuel, 1);

  return (
    <StationScreenTemplate title="Refuel">
      <div className="refuel-container">
        <div className="refuel-grid">
          <div className="fuel">
            Fuel: {fuelAmount}/{fuelCapacity}
          </div>
          <div className="bar">
            <Statbar
              backgroundColor="rgb(211, 211, 211)"
              barColor="rgb(224, 218, 104)"
              percentage={fuelPercentage}
            ></Statbar>
          </div>
          <div className="smallbutton1">
            <button disabled={!canBuy(1)} onClick={() => buy(1)}>
              1ps for ${fuelPrice}
            </button>
          </div>
          <div className="smallbutton2">
            <button disabled={!canBuy(10)} onClick={() => buy(10)}>
              10ps for ${fuelPrice * 10}
            </button>
          </div>
          <div className="bigbutton">
            <button disabled={!canBuy(1)} onClick={() => buy(maxFuel)}>
              <div className="refuel-button-text">
                <span className="large-text">Refuel</span>
                <span>
                  {maxFuel}ps for ${floor(maxFuel * fuelPrice, 1)}
                </span>
              </div>
            </button>
          </div>
          <div className="funds">Funds: ${funds}</div>
        </div>
      </div>
    </StationScreenTemplate>
  );
}
