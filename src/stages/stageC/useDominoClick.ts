import { useCallback, useContext } from "react";
import { Euler, Vector3, Vector3Tuple } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { useBuilt } from "../../blocks/useBuilt";
import { ControllerContext } from "../../controllers/ControllerContext";
import { SlotContext } from "../../controllers/SlotContext";
import { GestureMode } from "../../controllers/gestureMode";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { useClick as useSceneClick } from "../../scenes/useClick";

export function useDominoClick(
  nextPosition: Vector3 | undefined,
  angle: number,
  endPosition: Vector3Tuple
) {
  const { item } = useContext(SlotContext);

  const { gestureMode } = useContext(ControllerContext);

  const built = useBuilt();

  const setBlocks = useSetSlotBlocks();

  useSceneClick(
    useCallback(() => {
      if (!nextPosition) {
        return false;
      }

      if (item.state !== ItemState.Building) {
        return false;
      }

      if (gestureMode !== GestureMode.Build) {
        return false;
      }

      if (built) {
        return false;
      }

      const ending =
        Math.sqrt(
          Math.pow(nextPosition.x - endPosition[0], 2) +
            Math.pow(nextPosition.z - endPosition[2], 2)
        ) <= 20;

      setBlocks((blocks) => {
        if (blocks.some((block) => block.position.equals(nextPosition))) {
          return blocks;
        }

        return [
          ...blocks,
          {
            blockType: BlockType.Domino,
            dominoType: ending ? DominoType.Last : DominoType.Middle,
            position: nextPosition,
            rotation: new Euler(0, angle, 0),
          },
        ];
      });

      return true;
    }, [
      angle,
      built,
      endPosition,
      gestureMode,
      item.state,
      nextPosition,
      setBlocks,
    ])
  );
}
