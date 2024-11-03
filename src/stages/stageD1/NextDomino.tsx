import { Dispatch, SetStateAction, useMemo } from "react";
import { Vector3Tuple } from "three";
import { useDominoBuildNext } from "../stageC/useDominoBuildNext";
import { NextDominoBridge } from "./NextDominoBridge";
import { NextDominoGround } from "./NextDominoGround";

export function NextDomino({ nextAngle, setNextAngle }: Props) {
  useDominoBuildNext();

  const endPosition = useMemo<Vector3Tuple>(() => [0, 0, 120], []);

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
}
