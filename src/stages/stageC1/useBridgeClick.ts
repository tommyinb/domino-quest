import { useCallback, useContext } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { useBuilt } from "../../blocks/useBuilt";
import { ControllerContext } from "../../controllers/ControllerContext";
import { SlotContext } from "../../controllers/SlotContext";
import { GestureMode } from "../../controllers/gestureMode";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";
import { useClick as useSceneClick } from "../../scenes/useClick";

export function useBridgeClick(
  nextPosition: Vector3,
  angle: number,
  length: number,
  enabled: boolean
) {
  const { item } = useContext(SlotContext);

  const { gestureMode } = useContext(ControllerContext);

  const built = useBuilt();

  const setBuild = useSetSlotBuild();

  useSceneClick(
    useCallback(() => {
      if (!enabled) {
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

      setBuild((build) => {
        if (build.blocks.some((block) => block.position.equals(nextPosition))) {
          return build;
        }

        return {
          ...build,
          blocks: [
            ...build.blocks,
            {
              blockType: BlockType.Bridge,
              position: nextPosition,
              rotation: new Euler(0, angle, 0),
              length,
            },
          ],
          selectedNext: build.availableNexts.find(
            (next) => next.blockType === BlockType.Domino
          ),
        };
      });

      return true;
    }, [
      angle,
      built,
      enabled,
      gestureMode,
      item.state,
      length,
      nextPosition,
      setBuild,
    ])
  );
}
