import { useMemo, useState } from "react";
import { Vector3Tuple } from "three";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "../stageC2/NextBridge";
import { NextDomino } from "../stageC2/NextDomino";
import { useSteering } from "../stageC2/useSteering";

export function Next() {
  const firstAngle = Math.PI;
  const [facingAngle, setFacingAngle] = useState(firstAngle);

  const { steeringSize, steeringAngle, steer } = useSteering(
    useMemo(() => [80, 40, 20, 8], [])
  );

  useUndo(setFacingAngle, firstAngle);
  useRetry(setFacingAngle, firstAngle);

  const endPosition = useMemo<Vector3Tuple>(() => [0, 0, -350], []);

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
        length={150}
        angle={facingAngle + steeringAngle}
        steer={steer}
      />
    </>
  );
}
