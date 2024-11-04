import { Vector3 } from "three";
import { getStations } from "./getStations";

export function getPathLines() {
  const { start } = getStations();
  const pointStart = new Vector3(...start);

  const size = 250;
  const pointA = new Vector3(0 * size, 0, 1 * size);
  const pointB = new Vector3(0.951 * size, 0, 0.309 * size);
  const pointC = new Vector3(0.588 * size, 0, -0.809 * size);
  const pointD = new Vector3(-0.588 * size, 0, -0.809 * size);
  const pointE = new Vector3(-0.951 * size, 0, 0.309 * size);

  return [
    { from: pointStart, to: pointD },
    { from: pointD, to: pointB },
    { from: pointB, to: pointE },
    { from: pointE, to: pointC },
    { from: pointC, to: pointA },
  ];
}
