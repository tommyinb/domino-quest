import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { BlockType } from "../../dominos/blockType";
import { Play } from "../stage1/Play";
import { Ground } from "../stage3/Ground";
import { Next } from "../stage3/Next";
import { stationPositions } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
            {
              type: BlockType.First,
              position: new Vector3(...startPosition),
              rotation: new Euler(
                0,
                Math.atan2(
                  secondPosition[0] - startPosition[0],
                  secondPosition[2] - startPosition[2]
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
      <Ground stationPositions={stationPositions} />

      {item.state === ItemState.Building && (
        <Next stationPositions={stationPositions} />
      )}

      <Play />
    </>
  );
}
