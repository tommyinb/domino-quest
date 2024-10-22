import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { height } from "../../dominos/FollowDomino";
import { Hint } from "../../dominos/Hint";
import { NextDomino } from "./NextDomino";
import { endPosition } from "./start";
import { useNextClick } from "./useNextClick";

export function Next() {
  const { item } = useContext(SlotContext);
  const { blocks } = item;

  const nextPosition = useMemo(
    () =>
      (blocks[blocks.length - 1]?.position ?? new Vector3())
        .clone()
        .add(new Vector3(0, 0, -25)),
    [blocks]
  );

  const ending = useNextClick(nextPosition, endPosition);

  return (
    <NextDomino position={nextPosition} rotation={[0, 0, 0]}>
      {blocks.length <= 1 && (
        <Hint position={[0, height, 0]}>Press to build</Hint>
      )}

      {blocks.length > 1 && blocks.length < 4 && (
        <Hint position={[0, height, 0]}>Press</Hint>
      )}

      {blocks.length === 4 && <Hint position={[0, height, 0]}>Press...</Hint>}

      {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
    </NextDomino>
  );
}
