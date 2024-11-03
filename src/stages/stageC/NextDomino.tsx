import { Dispatch, SetStateAction } from "react";
import { NextDominoBridge } from "./NextDominoBridge";
import { NextDominoGround } from "./NextDominoGround";
import { useDominoBuildNext } from "./useDominoBuildNext";

export function NextDomino({ nextAngle, setNextAngle }: Props) {
  useDominoBuildNext();

  return (
    <>
      <NextDominoBridge />

      <NextDominoGround nextAngle={nextAngle} setNextAngle={setNextAngle} />
    </>
  );
}

interface Props {
  nextAngle: number;
  setNextAngle: Dispatch<SetStateAction<number>>;
}
