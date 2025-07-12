import { ReactNode, useEffect, useState } from "react";
import { useGameState } from "../App";
import { Cart } from "../types/Cart";
import * as Crt from "../logic/cart";
import * as Trd from "../logic/tradeInventory";
import * as Inv from "../logic/inventory";
import { clonePlayer, setCurrency } from "../logic/player";
import { getItemTypesForStation } from "../logic/station";
import { StationScreenTemplate } from "./station-screen-template";
import { getCargoUsage } from "../logic/ship";
import { updateStationInSystem } from "../logic/system";
import { floor, set, trunc1 } from "../utils/util";
import { ItemType } from "../types/ItemType";
import { allItemTypes } from "../constants/itemTypes";

export function StationTradeScreen() {
  const { station, player, setStation, setPlayer, system, setSystem } = useGameState();
  const [cart, setCart] = useState<Cart>(Crt.newCart(player, station));
  const weightTotal = floor(Crt.getCartWeight(cart), 1);
  const costTotal = floor(Crt.getCartCost(cart), 1);

  function onQuantityChange(itemType: ItemType, delta: number): void {
    setCart((cart) => Crt.addToCart(cart, itemType, delta));
  }

  function finalizeTrade() {
    let inventory = player.ship.inventory;
    for (const itemType of allItemTypes) {
      inventory = Inv.addItemCount(inventory, itemType, Crt.getItemCount(cart, itemType));
    }
    const newShip = set(player.ship, { inventory });
    const newPlayer = set(player, {
      ship: newShip,
      currency: player.currency - costTotal,
    });

    let tradeInventory = station.tradeInventory;
    for (const itemType of allItemTypes) {
      tradeInventory = Trd.addItemCount(tradeInventory, itemType, -Crt.getItemCount(cart, itemType));
    }
    const newStation = set(station, { tradeInventory });

    const newSystem = updateStationInSystem(system, station, newStation);

    setPlayer(newPlayer);
    setStation(newStation);
    setSystem(newSystem);
    setCart(Crt.newCart(newPlayer, newStation));
  }

  return (
    <StationScreenTemplate title="Trade">
      <div className="flex-column trade-container">
        <TradeList {...{ cart, onQuantityChange }} />
        <div className="trade-footer">
          <table>
            <tbody>
              <tr>
                <th rowSpan={2}>Cargo capacity:</th>
                <td>
                  {trunc1(getCargoUsage(player.ship))} / {player.ship.shipType.cargoCapacity} kg
                </td>
                <th rowSpan={2}>Funds:</th>
                <td>${trunc1(player.currency)}</td>
                <td rowSpan={2}>
                  <button
                    className="trade-button"
                    disabled={!Crt.isCartValid(cart) || !Crt.hasItems(cart)}
                    onClick={() => finalizeTrade()}
                  >
                    Trade
                  </button>
                </td>
              </tr>
              <tr>
                <td className={colorByValue(weightTotal, true)}>
                  {weightTotal > 0 ? "+" : weightTotal < 0 ? "-" : ""} {trunc1(Math.abs(weightTotal))} kg
                </td>
                <td className={colorByValue(costTotal, true)}>
                  {costTotal > 0 ? "-" : costTotal < 0 ? "+" : ""} ${trunc1(Math.abs(costTotal))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </StationScreenTemplate>
  );
}

/** Handles all inputs from TradeListItems and passes them up. */
function TradeList({
  cart,
  onQuantityChange,
}: {
  cart: Cart;
  onQuantityChange: (itemType: ItemType, delta: number) => void;
}) {
  const list: ReactNode[] = [];
  for (const itemType of allItemTypes) {
    list.push(
      <TradeListItem
        key={itemType.name}
        {...{
          cart,
          itemType,
          onQuantityChange: (delta: number) => {
            onQuantityChange(itemType, delta);
          },
          disabled: getItemTypesForStation(cart.station).indexOf(itemType) === -1,
        }}
      />
    );
  }

  return (
    <div className="trade-list">
      <table>
        <thead>
          <tr className="big-headers">
            <th colSpan={3} className="separate">
              Station
            </th>
            <th colSpan={5} className="separate">
              Cart
            </th>
            <th colSpan={2}>You</th>
          </tr>
          <tr className="small-headers">
            <th>Item</th>
            <th>Units</th>
            <th className="separate">Buy price</th>
            <th>Weight</th>
            <th>Cost</th>
            <th>Units</th>
            <th>Sell</th>
            <th className="separate">Buy</th>
            <th>Sell price</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  );
}

// Input: Cart, ItemType of this listing
// Output: Button clicks
function TradeListItem({
  cart,
  itemType,
  onQuantityChange,
  disabled,
}: {
  cart: Cart;
  itemType: ItemType;
  onQuantityChange: (delta: number) => void;
  disabled: boolean;
}) {
  const cartCost = trunc1(Crt.getItemCost(cart, itemType));
  const cartWeight = trunc1(Crt.getItemWeight(cart, itemType));
  const cartQuantity = Crt.getItemCount(cart, itemType);
  const buyPrice = trunc1(Trd.getItemBuyPrice(cart.station.tradeInventory, itemType, 1));
  const sellPrice = trunc1(Trd.getItemSellPrice(cart.station.tradeInventory, itemType, 1));

  /* Item, Units, Buy price, Weight, Cost, Units, Sell, Buy, Sell price, Units */
  return (
    <tr className={disabled ? "trade-disabled" : ""}>
      <th>{itemType.name}</th>
      <td className="">{Trd.getItemCount(cart.station.tradeInventory, itemType)}</td>
      <td className="separate">${buyPrice}</td>
      <td className={colorByValue(cartWeight, true)}>{cartWeight} kg</td>
      <td className={colorByValue(cartCost, true)}>${cartCost}</td>
      <td className={colorByValue(cartCost)}>{cartQuantity}</td>
      <td>
        <button onClick={() => onQuantityChange(-1)} disabled={!Crt.canRemove(cart, itemType) || disabled}>
          -
        </button>
      </td>
      <td className="separate">
        <button onClick={() => onQuantityChange(1)} disabled={!Crt.canAdd(cart, itemType) || disabled}>
          +
        </button>
      </td>
      <td>${sellPrice}</td>
      <td>{Inv.getItemCount(cart.player.ship.inventory, itemType)}</td>
    </tr>
  );
}

function colorByValue(value: number, invert: boolean = false) {
  if (invert) value *= -1;
  if (value > 0) return "value-up";
  if (value < 0) return "value-down";
  return "";
}
