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
import { stationPositions } from "./start";

export function Stage() {
  const { gestureMode } = useContext(ControllerContext);

  const { item } = useContext(SlotContext);
  const built = useBuilt();

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

      {gestureMode === GestureMode.Build &&
        item.state === ItemState.Building &&
        !built && <Next stationPositions={stationPositions} />}

      <Play />
    </>
  );
}
