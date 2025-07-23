import { allItemTypes } from "../../constants/itemTypes";
import { getCartCost } from "../../logic/cart";
import { Cart } from "../../types/Cart";
import { modifyItemCount, setMoney } from "../slices/playerSlice";
import { modifyStationItemCount } from "../slices/systemSlice";
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
