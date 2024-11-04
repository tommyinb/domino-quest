import { Vector3 } from "three";

export function getPathArc(
  center: Vector3,
  radius: number,
  fromAngle: number,
  toAngle: number
) {
  const steps = Math.floor((Math.PI * 2 * radius) / 15);

  return Array.from({ length: steps }).map((_, i) => {
    const angle = fromAngle + (toAngle - fromAngle) * (i / steps);

    return new Vector3(
      center.x + radius * Math.cos(angle),
      0,
      center.z + radius * Math.sin(angle)
    );
  });
}
