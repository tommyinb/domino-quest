import { useMemo, useState } from "react";
import { Vector3Tuple } from "three";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "./NextBridge";
import { NextDomino } from "./NextDomino";
import { useSteering } from "./useSteering";

export function Next() {
  const firstAngle = Math.PI / 2;
  const [facingAngle, setFacingAngle] = useState(firstAngle);

  const { steeringSize, steeringAngle, steer } = useSteering(
    useMemo(() => [28, 20, 12], [])
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
