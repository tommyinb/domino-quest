import { useCallback, useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { BlockType } from "../../dominos/blockType";
import { height } from "../../dominos/FollowDomino";
import { Hint } from "../../dominos/Hint";
import { useClick } from "../../scenes/useClick";
import { NextDomino } from "./NextDomino";
import { endPosition } from "./start";

export function Next() {
  const { item } = useContext(SlotContext);

  const nextPosition = useMemo(
    () =>
      (item.blocks[item.blocks.length - 1]?.position ?? new Vector3())
        .clone()
        .add(new Vector3(0, 0, -25)),
    [item.blocks]
  );

  const ending = useMemo(
    () =>
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 2,
    [nextPosition]
  );

  const setSlotItem = useSetSlotItem();
  useClick(
    useCallback(
      () =>
        setSlotItem((item) => ({
          ...item,
          state: ending ? ItemState.Built : item.state,
          blocks: [
            ...item.blocks,
            {
              type: ending ? BlockType.Last : BlockType.Middle,
              position: nextPosition,
              rotation: new Euler(),
            },
          ],
        })),
      [ending, nextPosition, setSlotItem]
    )
  );

  return (
    <NextDomino position={nextPosition} rotation={[0, 0, 0]}>
      {item.blocks.length <= 1 && (
        <Hint position={[0, height, 0]}>Press to build</Hint>
      )}

      {item.blocks.length > 1 && item.blocks.length < 4 && (
        <Hint position={[0, height, 0]}>Press</Hint>
      )}

      {item.blocks.length === 4 && (
        <Hint position={[0, height, 0]}>Press...</Hint>
      )}

      {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
    </NextDomino>
  );
}
