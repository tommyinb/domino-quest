import { Vector3 } from "three";

export function getPathLine(from: Vector3, to: Vector3) {
  const steps = Math.floor(from.distanceTo(to) / 15);

  return Array.from({ length: steps }).map((_, i) =>
    from.clone().lerp(to, i / steps)
  );
}
