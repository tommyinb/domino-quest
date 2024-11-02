import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { Judge } from "../stage1/Judge";
import { Ground } from "./Ground";
import { Next } from "./Next";
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
              blockType: BlockType.Domino,
              dominoType: DominoType.First,
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

      <Next stationPositions={stationPositions} />

      <Play key={item.round}>
        <Judge />
      </Play>
    </>
  );
}
