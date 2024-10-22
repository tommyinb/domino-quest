import { useCallback, useContext, useMemo } from "react";
import { Euler, Vector3, Vector3Tuple } from "three";
import { ControllerContext } from "../../controllers/ControllerContext";
import { SlotContext } from "../../controllers/SlotContext";
import { GestureMode } from "../../controllers/gestureMode";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { BlockType } from "../../dominos/blockType";
import { useBuilt } from "../../dominos/useBuilt";
import { useClick as useSceneClick } from "../../scenes/useClick";

export function useClick(
  nextPosition: Vector3,
  angle: number,
  endPosition: Vector3Tuple
) {
  const { item } = useContext(SlotContext);
  const setSlotItem = useSetSlotItem();

  const { gestureMode } = useContext(ControllerContext);

  const built = useBuilt();

  const ending = useMemo(
    () =>
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 20,
    [endPosition, nextPosition]
  );

  useSceneClick(
    useCallback(() => {
      if (item.state !== ItemState.Building) {
        return false;
      }

      if (gestureMode !== GestureMode.Build) {
        return false;
      }

      if (built) {
        return false;
      }

      setSlotItem((item) => {
        if (
          item.build.blocks.some((block) => block.position.equals(nextPosition))
        ) {
          return item;
        } else {
          return {
            ...item,
            build: {
              ...item.build,
              blocks: [
                ...item.build.blocks,
                {
                  type: ending ? BlockType.Last : BlockType.Middle,
                  position: nextPosition,
                  rotation: new Euler(0, angle, 0),
                },
              ],
            },
          };
        }
      });

      return true;
    }, [
      angle,
      built,
      ending,
      gestureMode,
      item.state,
      nextPosition,
      setSlotItem,
    ])
  );

  return ending;
}
