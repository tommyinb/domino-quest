import { Dispatch, SetStateAction, useCallback } from "react";
import { Vector3 } from "three";
import { useGesture as useGestureB } from "../stageB2/useGesture";

export function useGesture(
  lastPosition: Vector3,
  nextPosition: Vector3,
  setNextAngle: Dispatch<SetStateAction<number>>,
  enabled: boolean
) {
  useGestureB(
    lastPosition,
    nextPosition,
    useCallback(
      (angle) => {
        if (enabled) {
          setNextAngle(angle);
        }
      },
      [enabled, setNextAngle]
    )
  );
}
