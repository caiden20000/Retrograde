import {
  applyCommonSideEffects,
  commonSideEffects,
} from "../../logic/sideEffect";
import { SideEffect } from "../../types/SideEffect";
import { modifyFuel, modifyMoney } from "../slices/playerSlice";
import { AppThunk } from "../store";

export const applySideEffect =
  (sideEffect: SideEffect): AppThunk =>
  (dispatch, getState) => {
    const state = getState();

    // Apply side effect functions before evaluating
    let finalSideEffect = applyCommonSideEffects(sideEffect);

    dispatch(modifyMoney(finalSideEffect.money));
    // TODO: Prevent taking all fuel in a side effect -- gray out
    // button or only take what can be taken.
    dispatch(modifyFuel(finalSideEffect.fuel));

    // TODO: Write checked addCargo to playerSlice
    // dispatch(addCargo(finalSideEffect.cargo));
  };
