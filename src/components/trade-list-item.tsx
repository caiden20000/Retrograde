// Input: Cart, ItemType of this listing

import { colorByValue, floor } from "../utils/util";
import * as Crt from "../logic/cart";
import * as Trd from "../logic/tradeInventory";
import * as Inv from "../logic/inventory";
import { Cart } from "../types/Cart";
import { ItemType } from "../types/ItemType";

// Output: Button clicks
export function TradeListItem({
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
  const cartCost = floor(Crt.getItemCost(cart, itemType), 1);
  const cartWeight = floor(Crt.getItemWeight(cart, itemType), 1);
  const cartQuantity = Crt.getItemCount(cart, itemType);
  const buyPrice = floor(
    Trd.getItemBuyPrice(cart.station.tradeInventory, itemType, 1),
    1
  );
  const sellPrice = floor(
    Trd.getItemSellPrice(cart.station.tradeInventory, itemType, 1),
    1
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
