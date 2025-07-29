import { ReactNode, useEffect, useMemo, useState } from "react";
import { Cart } from "../types/Cart";
import * as Crt from "../logic/cart";
import * as Trd from "../logic/tradeInventory";
import * as Inv from "../logic/inventory";
import { getItemTypesForStation } from "../logic/station";
import { StationScreenTemplate } from "./station-screen-template";
import { getCargoUsage } from "../logic/ship";
import { addSign, colorByValue, floor, trunc1 } from "../utils/util";
import { ItemType } from "../types/ItemType";
import { allItemTypes } from "../constants/itemTypes";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectPlayer, selectShip, selectStation } from "../state/selectors";
import { checkout } from "../state/thunks/tradeThunk";
import { ErrorPage } from "./error";
import { TradeList } from "./trade-list";

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
