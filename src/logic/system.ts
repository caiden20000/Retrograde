import { MAX_STATION_DISTANCE, MIN_STATION_DISTANCE } from "../constants";
import { Station } from "../types/Station";
import { System } from "../types/System";
import { Vec2 } from "../types/Vec2";
import { newStation } from "./station";

export function generateSystem(systemCount: number): System {
  const system: System = [];
  const positions: Vec2[] = generatePositions(
    systemCount,
    { x: 512, y: 512 },
    MIN_STATION_DISTANCE,
    MAX_STATION_DISTANCE
  );
  for (const pos of positions) {
    // Make sure to not have copy names
    let stn: Station | null = null;
    while (stn === null || system.some((stn2) => stn?.name == stn2.name)) {
      stn = newStation(system.length.toString(), pos);
    }
    system.push(stn);
  }
  return system;
}

export function cloneSystem(system: System): System {
  return [...system];
}

export function updateStationInSystem(
  system: System,
  oldStation: Station,
  newStation: Station
): System {
  const newSystem = [...system];
  const stationIndex = newSystem.findIndex((stn) => stn.id === oldStation.id);
  if (stationIndex == -1)
    throw new Error(
      "Station ID not found when attempting to update station state."
    );
  newSystem.splice(stationIndex, 1, newStation);
  return newSystem;
}

/* An algorithm that can
  generate a system with stations that are well connected
  given a maximum edge length.
  
  Input: count: int, center: Pos, minDist: int, maxDist: int
  Output: Pos[]
  
  Create empty Pos set S
  Generate pos O at center
  Put O into S
  for count-1:
      Choose random pos P in S
      Generate a random offset pos F between minDist and maxDist
      Create a new pos P' equal to P + F
      If P' is minDist or less away from any pos in S:
          Increment count
      else:
          Put P' in S
  return S
  */

function generatePositions(
  count: number,
  center: Vec2,
  minDist: number,
  maxDist: number
): Vec2[] {
  const S: Vec2[] = [];
  S.push({ x: center.x, y: center.y });

  let attempts = 0;

  while (attempts < count - 1) {
    // Choose a random existing point from S
    const P = S[Math.floor(Math.random() * S.length)];

    // Generate a random offset direction and magnitude
    const angle = Math.random() * 2 * Math.PI;
    const distance = minDist + Math.random() * (maxDist - minDist);
    const F = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };

    // New candidate position
    const PPrime = {
      x: P.x + F.x,
      y: P.y + F.y,
    };

    // Check distance to all existing points
    let tooClose = false;
    for (const existing of S) {
      const dx = existing.x - PPrime.x;
      const dy = existing.y - PPrime.y;
      const distSq = dx * dx + dy * dy;
      if (distSq <= minDist * minDist) {
        tooClose = true;
        break;
      }
    }

    if (tooClose) {
      count++; // Try again in future iteration
    } else {
      S.push(PPrime);
    }

    attempts++;
  }

  return S;
}
