import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { BlockType } from "../../dominos/blockType";
import { Play } from "../Play";
import { Judge } from "../stage1/Judge";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { middlePosition, startPosition } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

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

      <Next />

      <Play key={item.round}>
        <Judge />
      </Play>
    </>
  );
}
