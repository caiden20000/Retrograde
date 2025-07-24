import { allItemTypes } from "../../constants/itemTypes";
import { getCartCost } from "../../logic/cart";
import { runTradeForSystem } from "../../logic/station-trade-manager";
import { Cart } from "../../types/Cart";
import { modifyItemCount, setMoney } from "../slices/playerSlice";
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
        dispatch(modifyItemCount({ itemType, count }));
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
    dispatch(setMoney(state.player.money - totalCost));
  };

export const systemTrade =
  (revs: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const system = state.system;
    const newSystem = runTradeForSystem(state.system, revs);
    dispatch(replaceAllStations(newSystem));
  };
