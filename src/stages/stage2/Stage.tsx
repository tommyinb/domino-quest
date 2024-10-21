import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { BlockType } from "../../dominos/blockType";
import { useBuilt } from "../../dominos/useBuilt";
import { Play } from "../Play";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { middlePosition, startPosition } from "./start";

export function Stage() {
  const { gestureMode } = useContext(ControllerContext);

  const { item } = useContext(SlotContext);
  const built = useBuilt();

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
            {
              type: BlockType.First,
              position: new Vector3(...startPosition),
              rotation: new Euler(
                0,
                Math.atan2(
                  middlePosition[0] - startPosition[0],
                  middlePosition[2] - startPosition[2]
                ),
                0
              ),
            },
          ]
        : blocks
    );
  }, [setSlotBlocks]);

  return (
    <>
      <Ground />

      {gestureMode === GestureMode.Build &&
        item.state === ItemState.Building &&
        !built && <Next />}

      <Play key={item.round} />
    </>
  );
}
