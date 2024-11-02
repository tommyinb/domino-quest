import { Vector3 } from "three";

export function getNextPosition(
  lastPosition: Vector3,
  distance: number,
  angle: number
) {
  const direction = new Vector3(
    Math.sin(angle) * distance,
    0,
    Math.cos(angle) * distance
  );

  return direction.add(lastPosition);
}
