import { ReactNode, useEffect, useMemo, useState } from "react";
import { Cart } from "../types/Cart";
import * as Crt from "../logic/cart";
import * as Trd from "../logic/tradeInventory";
import * as Inv from "../logic/inventory";
import { getItemTypesForStation } from "../logic/station";
import { StationScreenTemplate } from "./station-screen-template";
import { getCargoUsage } from "../logic/ship";
import { floor, trunc1 } from "../utils/util";
import { ItemType } from "../types/ItemType";
import { allItemTypes } from "../constants/itemTypes";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectPlayer, selectShip, selectStation } from "../state/selectors";
import { checkout } from "../state/thunks/tradeThunk";
import { ErrorPage } from "./error";

export function StationTradeScreen() {
  const dispatch = useAppDispatch();
  const player = useAppSelector(selectPlayer);
  const station = useAppSelector(selectStation);
  const ship = useAppSelector(selectShip);

  if (station === null) {
    return (
      <ErrorPage
        code="6154952356136"
        reason="Attempted to load cart on trade screen while station was null (implies traveling)"
      />
    );
  }

  const [cart, setCart] = useState<Cart>(Crt.newCart(player, station));

  useEffect(() => {
    setCart((cart) => {
      const newCart = Crt.cloneCart(cart);
      newCart.player = player;
      newCart.station = station;
      return newCart;
    });
  }, [player, station]);

  const weightTotal = useMemo(() => floor(Crt.getCartWeight(cart), 1), [cart]);
  const costTotal = useMemo(() => floor(Crt.getCartCost(cart), 1), [cart]);

  function onQuantityChange(itemType: ItemType, delta: number): void {
    setCart((cart) => Crt.addToCart(cart, itemType, delta));
  }

  function finalizeTrade() {
    if (station === null)
      throw new Error("Station is null when finalizing a trade!");
    dispatch(checkout(cart));
    setCart(Crt.newCart(player, station));
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
                  {trunc1(getCargoUsage(ship))} / {ship.shipType.cargoCapacity}{" "}
                  kg
                </td>
                <th rowSpan={2}>Funds:</th>
                <td>${trunc1(player.money)}</td>
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
                  {addSign(weightTotal)} {trunc1(Math.abs(weightTotal))} kg
                </td>
                <td className={colorByValue(costTotal, true)}>
                  {addSign(costTotal)} ${trunc1(Math.abs(costTotal))}
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
  readonly cart: Cart;
  readonly onQuantityChange: (itemType: ItemType, delta: number) => void;
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
          disabled:
            getItemTypesForStation(cart.station).indexOf(itemType) === -1,
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
  readonly cart: Cart;
  readonly itemType: ItemType;
  readonly onQuantityChange: (delta: number) => void;
  readonly disabled: boolean;
}) {
  const cartCost = trunc1(Crt.getItemCost(cart, itemType));
  const cartWeight = trunc1(Crt.getItemWeight(cart, itemType));
  const cartQuantity = Crt.getItemCount(cart, itemType);
  const buyPrice = trunc1(
    Trd.getItemBuyPrice(cart.station.tradeInventory, itemType, 1)
  );
  const sellPrice = trunc1(
    Trd.getItemSellPrice(cart.station.tradeInventory, itemType, 1)
  );

  /* Item, Units, Buy price, Weight, Cost, Units, Sell, Buy, Sell price, Units */
  return (
    <tr className={disabled ? "trade-disabled" : ""}>
      <th>{itemType.name}</th>
      <td className="">
        {Trd.getItemCount(cart.station.tradeInventory, itemType)}
      </td>
      <td className="separate">${buyPrice}</td>
      <td className={colorByValue(cartWeight, true)}>{cartWeight} kg</td>
      <td className={colorByValue(cartCost, true)}>${cartCost}</td>
      <td className={colorByValue(cartCost)}>{cartQuantity}</td>
      <td>
        <button
          onClick={() => onQuantityChange(-1)}
          disabled={!Crt.canRemove(cart, itemType) || disabled}
        >
          -
        </button>
      </td>
      <td className="separate">
        <button
          onClick={() => onQuantityChange(1)}
          disabled={!Crt.canAdd(cart, itemType) || disabled}
        >
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

function addSign(num: number) {
  if (num > 0) return "+";
  if (num < 0) return "-";
  return "";
}
