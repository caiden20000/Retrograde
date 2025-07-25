import { SideEffect } from "../types/SideEffect";

export function newSideEffect(options?: Partial<SideEffect>) {
  return {
    playerMoney: 0,
    ...options,
  };
}

export function doSideEffect(sideEffect: SideEffect): void {
  return; // TODO
}
