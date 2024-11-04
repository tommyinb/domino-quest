import { useCallback, useMemo, useState } from "react";
import { Vector3Tuple } from "three";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "./NextBridge";
import { NextDomino } from "./NextDomino";

export function Next() {
  const firstAngle = Math.PI / 2;
  const [facingAngle, setFacingAngle] = useState(firstAngle);

  const [steeringStep, setSteeringStep] = useState(0);
  const steeringSize = useMemo(() => {
    if (steeringStep === 0) {
      return 0;
    } else {
      const sizes = [14, 10, 6];
      const index = (Math.abs(steeringStep) - 1) % sizes.length;

      return sizes[index];
    }
  }, [steeringStep]);

  const steeringAngle = useMemo(
    () =>
      steeringSize > 0
        ? Math.sign(steeringStep) * (Math.PI / steeringSize / 2)
        : 0,
    [steeringSize, steeringStep]
  );
  const steer = useCallback(
    (side: number) =>
      setSteeringStep((steering) => Math.min(Math.max(steering + side, -3), 3)),
    []
  );

  useUndo(setFacingAngle, firstAngle);
  useRetry(setFacingAngle, firstAngle);

  const endPosition = useMemo<Vector3Tuple>(() => [0, 0, 300], []);

  return (
    <>
      <NextDomino
        facingAngle={facingAngle}
        setFacingAngle={setFacingAngle}
        steeringSize={steeringSize}
        steeringAngle={steeringAngle}
        steer={steer}
        endPosition={endPosition}
      />

      <NextBridge
        length={120}
        angle={facingAngle + steeringAngle}
        steer={steer}
      />
    </>
  );
}
