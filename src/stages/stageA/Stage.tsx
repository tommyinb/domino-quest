import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { Ground } from "./Ground";
import { Judge } from "./Judge";
import { Next } from "./Next";
import { startPosition } from "./start";

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
              position: new Vector3(...startPosition),
              rotation: new Euler(0, Math.PI, 0),
            },
          ]
        : blocks
    );
  }, [setSlotBlocks]);

  const currentLevel = useCurrentLevel();

  return (
    <>
      <Ground />

      {item.level === currentLevel && <Next />}

      <Play key={item.round}>
        <Judge />
      </Play>
    </>
  );
}
