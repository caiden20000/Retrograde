import { useGameState } from "../App";
import { StationScreenTemplate } from "./station-screen-template";
import * as Trd from "../logic/tradeInventory";
import { itemType } from "../constants/itemTypes";
import { updateStationInSystem } from "../logic/system";
import { set, floor } from "../utils/util";

export function StationFuelScreen() {
  const { station, player, setStation, setPlayer, system, setSystem } =
    useGameState();

  const funds = player.currency;
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
    const fullCost = floor(fuelAmount * fuelPrice);

    let newShip = set(player.ship, {
      fuel: player.ship.fuel + fuelAmount,
    });
    let newPlayer = set(player, {
      currency: player.currency - fullCost,
      ship: newShip,
    });

    const newStation = set(station, {
      tradeInventory: Trd.addItemCount(
        station.tradeInventory,
        itemType.fuel,
        -fuelAmount
      ),
    });
    const newSystem = updateStationInSystem(system, station, newStation);

    setPlayer(newPlayer);
    setStation(newStation);
    setSystem(newSystem);
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
            <Statbar percentage={fuelPercentage}></Statbar>
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
                  {maxFuel}ps for ${maxFuel * fuelPrice}
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

function Statbar({ percentage }: { percentage: number }) {
  return (
    <div className="statbar">
      <div
        className="statbar-fill"
        style={{ width: percentage * 100 + "%" }}
      ></div>
    </div>
  );
}
