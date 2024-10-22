import { useCallback, useMemo } from "react";
import { Euler, Vector3, Vector3Tuple } from "three";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { BlockType } from "../../dominos/blockType";
import { useClick } from "../../scenes/useClick";

export function useNextClick(nextPosition: Vector3, endPosition: Vector3Tuple) {
  const ending = useMemo(
    () =>
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 2,
    [endPosition, nextPosition]
  );

  const setSlotItem = useSetSlotItem();
  useClick(
    useCallback(() => {
      setSlotItem((item) => ({
        ...item,
        blocks: [
          ...item.blocks,
          {
            type: ending ? BlockType.Last : BlockType.Middle,
            position: nextPosition,
            rotation: new Euler(),
          },
        ],
      }));
    }, [ending, nextPosition, setSlotItem])
  );

  return ending;
}
