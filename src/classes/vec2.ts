export type Vec2 = { x: number; y: number };

export function newVec2(x: number, y: number) {
  return { x, y };
}

export function cloneVec2(vec2: Vec2): Vec2 {
  return { ...vec2 };
}

export function getDistance(point1: Vec2, point2: Vec2): number {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
