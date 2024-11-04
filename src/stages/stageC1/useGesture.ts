import { useCallback } from "react";
import { Vector3 } from "three";
import { useGesture as useGestureB } from "../stageB2/useGesture";

export function useGesture(
  lastPosition: Vector3,
  nextPosition: Vector3,
  steer: (side: number) => void,
  enabled: boolean
) {
  useGestureB(
    lastPosition,
    nextPosition,
    useCallback(
      (side) => {
        if (enabled) {
          steer(side);
        }
      },
      [enabled, steer]
    )
  );
}
