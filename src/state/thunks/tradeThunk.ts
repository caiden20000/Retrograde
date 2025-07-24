import { allItemTypes, itemType } from "../../constants/itemTypes";
import { getCartCost } from "../../logic/cart";
import { runTradeForSystem } from "../../logic/station-trade-manager";
import { getItemBuyPrice } from "../../logic/tradeInventory";
import { Cart } from "../../types/Cart";
import {
  modifyFuel,
  modifyPlayerItemCount,
  modifyMoney,
} from "../slices/playerSlice";
import {
  modifyStationItemCount,
  replaceAllStations,
} from "../slices/systemSlice";
import { AppThunk } from "../store";

/** Does not validate any numbers. */
export const checkout =
  (cart: Cart): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const cartInventory = cart.cartInventory;

    for (const itemType of allItemTypes) {
      const count = cartInventory[itemType.name];
      if (count !== undefined) {
        dispatch(modifyPlayerItemCount({ itemType, count }));
        dispatch(
          modifyStationItemCount({
            id: cart.station.id,
            itemType,
            count: -count,
          })
        );
      }
    }
    const totalCost = getCartCost(cart);
    dispatch(modifyMoney(state.player.money - totalCost));
  };

export const systemTrade =
  (revs: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const system = state.system;
    const newSystem = runTradeForSystem(state.system, revs);
    dispatch(replaceAllStations(newSystem));
  };

export const buyFuel =
  (stationId: string, fuelAmount: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const station = state.system.find((stn) => stn.id == stationId);
    if (station === undefined)
      throw new Error("Tried to buy fuel when station was null!");
    dispatch(modifyFuel(fuelAmount));
    dispatch(
      modifyStationItemCount({
        id: station.id,
        itemType: itemType.fuel,
        count: -fuelAmount,
      })
    );
    dispatch(
      modifyMoney(
        -(fuelAmount * getItemBuyPrice(station.tradeInventory, itemType.fuel))
      )
    );
  };
