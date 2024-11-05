import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { ControllerContext } from "../../controllers/ControllerContext";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";

export function Stage() {
  const { item } = useContext(SlotContext);
  const { currentLevel } = useContext(ControllerContext);

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
            {
              blockType: BlockType.Domino,
              dominoType: DominoType.First,
              position: new Vector3(15, 0, 180),
              rotation: new Euler(0, Math.PI / 2, 0),
            },
          ]
        : blocks
    );
  }, [setSlotBlocks]);

  return (
    <>
      <Ground />

      {item.level === currentLevel && <Next />}

      <Play key={item.round}>
        <Path />
      </Play>
    </>
  );
}
