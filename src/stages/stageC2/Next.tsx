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
  const steeringAngle = useMemo(() => {
    if (steeringStep === 0) {
      return 0;
    } else {
      const counts = [14, 10, 6];
      const index = (Math.abs(steeringStep) - 1) % counts.length;
      const count = counts[index];

      return Math.sign(steeringStep) * (Math.PI / count / 2);
    }
  }, [steeringStep]);
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
        steeringAngle={steeringAngle}
        steer={steer}
        endPosition={endPosition}
      />

      <NextBridge angle={facingAngle + steeringAngle} steer={steer} />
    </>
  );
}
