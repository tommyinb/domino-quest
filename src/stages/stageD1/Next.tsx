import { useState } from "react";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "./NextBridge";
import { NextDomino } from "./NextDomino";

export function Next() {
  const firstAngle = Math.PI / 2;
  const [nextAngle, setNextAngle] = useState(firstAngle);

  useUndo(setNextAngle, firstAngle);
  useRetry(setNextAngle, firstAngle);

  return (
    <>
      <NextDomino nextAngle={nextAngle} setNextAngle={setNextAngle} />

      <NextBridge nextAngle={nextAngle} setNextAngle={setNextAngle} />
    </>
  );
}
