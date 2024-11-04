import { Vector3 } from "three";
import { buttonSize } from "./Ground";
import { endPosition, startPosition } from "./start";

export function getPath() {
  const points: Vector3[] = [];

  const lapCount = 3;
  const lapStepCount = 32;
  const totalStepCount = lapCount * lapStepCount;
  for (let i = totalStepCount; i >= 0; i--) {
    const angle = (i / lapStepCount) * Math.PI * 2 + Math.PI / 2;

    const distance =
      (i / totalStepCount) * (endPosition[2] - startPosition[2]) +
      startPosition[2];

    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;

    if (
      Math.sqrt(
        Math.pow(x - startPosition[0], 2) + Math.pow(z - startPosition[2], 2)
      ) <= buttonSize ||
      Math.sqrt(
        Math.pow(x - endPosition[0], 2) + Math.pow(z - endPosition[2], 2)
      ) <= buttonSize
    ) {
      continue;
    }

    points.push(new Vector3(x, 0, z));
  }

  return points.reverse();
}
