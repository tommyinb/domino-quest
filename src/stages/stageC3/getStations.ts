import { Vector3Tuple } from "three";

export function getStations() {
  const x = Math.sin(Math.PI * 0.1) * 40;
  const z = Math.cos(Math.PI * 0.1) * 40;

  return {
    start: [-x, 0, 250 - z] as Vector3Tuple,
    end: [x, 0, 250 + z] as Vector3Tuple,
  };
}
