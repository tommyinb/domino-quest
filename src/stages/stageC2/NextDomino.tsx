import { Vector3Tuple } from "three";
import { useDominoBuildNext } from "../stageC1/useDominoBuildNext";
import { NextDominoBridge } from "./NextDominoBridge";
import { NextDominoGround } from "./NextDominoGround";

export function NextDomino({
  facingAngle,
  setFacingAngle,
  steeringAngle,
  steer,
  endPosition,
}: Props) {
  useDominoBuildNext();

  return (
    <>
      <NextDominoBridge endPosition={endPosition} />

      <NextDominoGround
        facingAngle={facingAngle}
        setFacingAngle={setFacingAngle}
        steeringAngle={steeringAngle}
        steer={steer}
        endPosition={endPosition}
      />
    </>
  );
}

interface Props {
  facingAngle: number;
  setFacingAngle: (angle: number) => void;
  steeringAngle: number;
  steer: (side: number) => void;

  endPosition: Vector3Tuple;
}
