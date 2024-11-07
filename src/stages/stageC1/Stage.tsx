import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { getNextPosition } from "../stageB1/getNextPosition";
import { getPathParameters } from "./getPathParameters";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";

export function Stage() {
  const { item } = useContext(SlotContext);

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    setSlotBlocks((blocks) => {
      if (blocks.length > 0) {
        return blocks;
      }

      const { pointX, pointY } = getPathParameters();

      return [
        {
          blockType: BlockType.Domino,
          dominoType: DominoType.First,
          position: getNextPosition(
            new Vector3(-pointX, 0, -pointY),
            15,
            Math.PI / 4
          ),
          rotation: new Euler(0, Math.PI / 4, 0),
        },
      ];
    });
  }, [setSlotBlocks]);

  const currentLevel = useCurrentLevel();

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
