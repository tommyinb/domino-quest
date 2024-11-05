import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { Judge } from "../stageA/Judge";
import { Ground } from "./Ground";
import { Next } from "./Next";

export function Stage() {
  const { item } = useContext(SlotContext);

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
            {
              blockType: BlockType.Domino,
              dominoType: DominoType.First,
              position: new Vector3(0, 0, 350),
              rotation: new Euler(0, Math.PI, 0),
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
