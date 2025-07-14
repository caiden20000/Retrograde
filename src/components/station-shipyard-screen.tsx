import { ShipType } from "../types/ShipType";
import { StationScreenTemplate } from "./station-screen-template";

export function StationShipyardScreen() {
  return (
    <StationScreenTemplate title="Shipyard">
      <p>Buy ships here</p>
    </StationScreenTemplate>
  );
}

export function ShipList() {}

export function ShipItem({ shipType }: { shipType: ShipType }) {}
