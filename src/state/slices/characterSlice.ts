import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "../../types/Character";
import { Travel } from "../../types/Travel";
import { Station } from "../../types/Station";
import { Ship } from "../../types/Ship";
import { ItemType } from "../../types/ItemType";
import { ShipType } from "../../types/ShipType";
import { newShip } from "../../logic/ship";
import { addItemCount, reduceTo } from "../../logic/inventory";

export const newCharacterSlice = (name: string, initialState: Character) =>
  createSlice({
    name,
    initialState,
    reducers: {
      setMoney: (state, action: PayloadAction<number>) => {
        state.money = action.payload;
      },
      setLocation: (state, action: PayloadAction<string | Travel>) => {
        state.location = action.payload;
      },
      setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
      },
      changeShip: (state, action: PayloadAction<ShipType>) => {
        if (state.ship === null) {
          state.ship = newShip(action.payload);
        } else {
          const reducedInventory = reduceTo(
            state.ship.inventory,
            action.payload.cargoCapacity
          );
          state.ship = newShip(action.payload);
          state.ship.inventory = reducedInventory;
        }
      },
      modifyItemCount(
        state,
        action: PayloadAction<{ itemType: ItemType; count: number }>
      ) {
        if (state.ship !== null) {
          const { itemType, count } = action.payload;
          state.ship.inventory = addItemCount(
            state.ship.inventory,
            itemType,
            count
          );
        }
      },
    },
  });
