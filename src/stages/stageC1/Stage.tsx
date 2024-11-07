import { useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { Play } from "../Play";
import { useFirstBlock } from "../stageA/useFirstBlock";
import { getNextPosition } from "../stageB1/getNextPosition";
import { getPathParameters } from "./getPathParameters";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";

export function Stage() {
  const { item } = useContext(SlotContext);

  const currentLevel = useCurrentLevel();

  useFirstBlock(
    useMemo(() => {
      const { pointX, pointY } = getPathParameters();

      return {
        blockType: BlockType.Domino,
        dominoType: DominoType.First,
        position: getNextPosition(
          new Vector3(-pointX, 0, -pointY),
          15,
          Math.PI / 4
        ),
        rotation: new Euler(0, Math.PI / 4, 0),
      };
    }, [])
  );

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
