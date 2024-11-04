import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { getStations } from "./getStations";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";

export function Stage() {
  const { item } = useContext(SlotContext);

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    const { start } = getStations();

    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
            {
              blockType: BlockType.Domino,
              dominoType: DominoType.First,
              position: new Vector3(...start),
              rotation: new Euler(0, Math.PI * 1.1, 0),
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
        <Path />
      </Play>
    </>
  );
}
