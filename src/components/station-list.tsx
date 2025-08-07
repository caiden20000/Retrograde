import { newVec2 } from "../logic/vec2";
import { Player } from "../types/Player";
import { Station } from "../types/Station";
import { System } from "../types/System";
import { Vec2 } from "../types/Vec2";
import { getBoundsOfSystem, stationDistance } from "../utils/util";
import { StationDot } from "./station-dot";
import "../styles/station-list.css";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../state/hooks";
import { selectStation, selectPlayer, selectSystem } from "../state/selectors";
import { ItemType } from "../types/ItemType";
import { getItemSellPrice } from "../logic/tradeInventory";

export function StationList({
  onSelect,
  selectedStation,
  compareItemType,
}: {
  readonly onSelect: (station: Station) => void;
  selectedStation: Station | null;
  compareItemType: ItemType | null;
}) {
  const station = useAppSelector(selectStation);
  const player = useAppSelector(selectPlayer);
  const system = useAppSelector(selectSystem);
  if (station === null) throw new Error("Station should not be null here");
  const bounds = getBoundsOfSystem(system);
  const maxBound = Math.max(
    bounds.br.x - bounds.tl.x,
    bounds.br.y - bounds.tl.y
  );
  let scale = newVec2(maxBound, maxBound);
  let borderLR = [0.05, 0.1];
  let borderTB = [0.05, 0.1];

  function absolutePosition(station: Station): Vec2 {
    const pos = newVec2(
      (station.position.x - bounds.tl.x + borderLR[0]) * (1 / scale.x),
      (station.position.y - bounds.tl.y + borderTB[0]) * (1 / scale.y)
    );
    const bordered = newVec2(
      (pos.x * (1 - (borderLR[0]+borderLR[1]))) + (borderLR[0]),
      (pos.y * (1 - (borderTB[0]+borderTB[1]))) + (borderTB[0]),
    )
    return bordered;
  }

  function onTravel(station: Station) {
    onSelect(station);
  }

  function canTravelTo(stn: Station) {
    if (station === null) return false;
    return stationDistance(station, stn) <= player.ship.fuel;
  }

  const starDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (starDivRef.current === null) return; 
    let a="";
    // Consts are pre-balanced to generally fill the space.
    const starCount = 30000;
    const starRarity = 0.99;
    for(let i=0;i<starCount;i++)a+=Math.random()>starRarity?".":" ";
    starDivRef.current.setAttribute("stars", a);
  }, [starDivRef]);

  return (
    <div className="system-dot-map" ref={starDivRef}>
      {system.map((stn) => (
        <StationDot
          key={stn.name}
          station={stn}
          absolutePosition={absolutePosition(stn)}
          onTravel={onTravel}
          color={colorStation(stn, station, system, canTravelTo(stn), compareItemType)}
          canTravelTo={canTravelTo(stn)}
          selected={stn==selectedStation}
        />
      ))}
    </div>
  );
}

function colorStation(station: Station, playerStation: Station, system: System, canTravelTo: boolean, compareItemType: ItemType | null): string {
  if (compareItemType === null) {
    if (playerStation == station) return "cyan";
    if (canTravelTo) return "green";
    else return "red";
  }
  const midColor = "#FF0";
  const lowColor = "#0F0";
  const highColor = "#F00";

  if (playerStation == station) return midColor;

  // Compare here
  const stationPrice = getItemSellPrice(station.tradeInventory, compareItemType);
  const anchorPrice = getItemSellPrice(playerStation.tradeInventory, compareItemType);
  let minPrice = stationPrice;
  let maxPrice = minPrice;
  for (const stn of system) {
    const price = getItemSellPrice(stn.tradeInventory, compareItemType);
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;
  }
  
  if (stationPrice < anchorPrice) return `color-mix(in hsl, ${midColor}, ${lowColor} ${((stationPrice - minPrice) / (anchorPrice - minPrice))*100}%`;
  if (stationPrice > anchorPrice) return `color-mix(in hsl, ${midColor}, ${highColor} ${(1-((stationPrice - maxPrice) / (anchorPrice - maxPrice)))*100}%`;
  if (stationPrice == anchorPrice) return midColor;

  return "#FFF";
}
// distance={stationDistance(station, stn)}
// maxTravelDistance={player.ship.fuel}

