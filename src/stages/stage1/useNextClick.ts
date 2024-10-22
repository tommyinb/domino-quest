import { useCallback, useContext, useMemo } from "react";
import { Euler, Vector3, Vector3Tuple } from "three";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { BlockType } from "../../dominos/blockType";
import { useClick } from "../../scenes/useClick";

export function useNextClick(
  nextPosition: Vector3,
  angle: number,
  endPosition: Vector3Tuple
) {
  const { gestureMode } = useContext(ControllerContext);

  const setSlotItem = useSetSlotItem();

  const ending = useMemo(
    () =>
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 20,
    [endPosition, nextPosition]
  );

  useClick(
    useCallback(() => {
      if (gestureMode !== GestureMode.Build) {
        return;
      }

      setSlotItem((item) => ({
        ...item,
        blocks: [
          ...item.blocks,
          {
            type: ending ? BlockType.Last : BlockType.Middle,
            position: nextPosition,
            rotation: new Euler(0, angle, 0),
          },
        ],
      }));
    }, [angle, ending, gestureMode, nextPosition, setSlotItem])
  );

  return ending;
}
