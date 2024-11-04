import { useMemo } from "react";
import { Vector3 } from "three";
import { getPathParameters } from "./getPathParameters";

export function usePath() {
  return useMemo(() => {
    const { centerX, pointX, pointY, radius } = getPathParameters();

    const points: Vector3[] = [];

    addLinePoints(-pointX, -pointY, pointX, pointY);
    function addLinePoints(
      fromX: number,
      fromY: number,
      toX: number,
      toY: number
    ) {
      const count = 10;
      for (let i = 0; i < count; i++) {
        const x = fromX + (toX - fromX) * (i / count);
        const y = fromY + (toY - fromY) * (i / count);
        points.push(new Vector3(x, 0, y));
      }
    }

    const arcAngle = Math.atan2(pointY, pointX - centerX);
    const arcSteps = 32;
    (function addClockwisePoints() {
      for (let i = 0; i < arcSteps; i++) {
        const angle = arcAngle - arcAngle * 2 * (i / arcSteps);
        const x = centerX + radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push(new Vector3(x, 0, y));
      }
    })();

    addLinePoints(pointX, -pointY, -pointX, pointY);

    (function addCounterClockwisePoints() {
      const fromAngle = Math.PI - arcAngle;
      const toAngle = Math.PI + arcAngle;
      for (let i = 0; i < arcSteps; i++) {
        const angle = fromAngle + (toAngle - fromAngle) * (i / arcSteps);
        const x = -centerX + radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push(new Vector3(x, 0, y));
      }
    })();

    points.push(new Vector3(-pointX, 0, -pointY));

    return points;
  }, []);
}
