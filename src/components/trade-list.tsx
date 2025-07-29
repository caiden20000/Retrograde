import { ReactNode } from "react";
import { allItemTypes } from "../constants/itemTypes";
import { getItemTypesForStation } from "../logic/station";
import { Cart } from "../types/Cart";
import { ItemType } from "../types/ItemType";
import { TradeListItem } from "./trade-list-item";

/** Handles all inputs from TradeListItems and passes them up. */
export function TradeList({
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
