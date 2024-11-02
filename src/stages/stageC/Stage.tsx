import { useContext, useEffect, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
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
            {
              blockType: BlockType.Bridge,
              position: getNextPosition(
                new Vector3(-pointX, 0, -pointY),
                43 + 50,
                Math.PI / 4
              ),
              rotation: new Euler(0, Math.PI / 4, 0),
              length: 100,
            },
          ]
        : blocks
    );
  }, [pointX, pointY, setSlotBlocks]);

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
