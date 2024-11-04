import { Dispatch, SetStateAction } from "react";
import { Vector3Tuple } from "three";
import { useDominoBuildNext } from "../stageC1/useDominoBuildNext";
import { NextDominoBridge } from "./NextDominoBridge";
import { NextDominoGround } from "./NextDominoGround";

export function NextDomino({ nextAngle, setNextAngle, endPosition }: Props) {
  useDominoBuildNext();

  return (
    <>
      <NextDominoBridge endPosition={endPosition} />

      <NextDominoGround
        nextAngle={nextAngle}
        setNextAngle={setNextAngle}
        endPosition={endPosition}
      />
    </>
  );
}

interface Props {
  nextAngle: number;
  setNextAngle: Dispatch<SetStateAction<number>>;

  endPosition: Vector3Tuple;
}
