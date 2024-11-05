import { useContext, useEffect, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { ControllerContext } from "../../controllers/ControllerContext";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { Play } from "../Play";
import { getNextPosition } from "../stageB1/getNextPosition";
import { getPathParameters } from "./getPathParameters";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";

export function Stage() {
  const { item } = useContext(SlotContext);
  const { currentLevel } = useContext(ControllerContext);

  const { pointX, pointY } = useMemo(getPathParameters, []);

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
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
          ]
        : blocks
    );
  }, [pointX, pointY, setSlotBlocks]);

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
