import { useMemo, useState } from "react";
import { Vector3Tuple } from "three";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "./NextBridge";
import { NextDomino } from "./NextDomino";

export function Next() {
  const firstAngle = Math.PI / 2;
  const [facingAngle, setFacingAngle] = useState(firstAngle);

  useUndo(setFacingAngle, firstAngle);
  useRetry(setFacingAngle, firstAngle);

  const endPosition = useMemo<Vector3Tuple>(() => [0, 0, 300], []);

  return (
    <>
      <NextDomino
        nextAngle={facingAngle}
        setNextAngle={setFacingAngle}
        endPosition={endPosition}
      />

      <NextBridge nextAngle={facingAngle} setNextAngle={setFacingAngle} />
    </>
  );
}
