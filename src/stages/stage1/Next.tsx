import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { height } from "../../dominos/FollowDomino";
import { Hint } from "../../dominos/Hint";
import { useBuilt } from "../../dominos/useBuilt";
import { NextDomino } from "./NextDomino";
import { endPosition } from "./start";
import { useClick } from "./useClick";

export function Next() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const nextPosition = useMemo(
    () =>
      (blocks[blocks.length - 1]?.position ?? new Vector3())
        .clone()
        .add(new Vector3(0, 0, -25)),
    [blocks]
  );

  const built = useBuilt();

  const ending = useClick(nextPosition, 0, endPosition);

  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, 0, 0]}>
          {blocks.length <= 1 && (
            <Hint position={[0, height, 0]}>Press to build</Hint>
          )}

          {blocks.length > 1 && blocks.length < 4 && (
            <Hint position={[0, height, 0]}>Press</Hint>
          )}

          {blocks.length === 4 && (
            <Hint position={[0, height, 0]}>Press...</Hint>
          )}

          {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
        </NextDomino>
      )}
    </>
  );
}
