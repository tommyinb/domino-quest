import { useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { Play } from "../Play";
import { Judge } from "../stageA/Judge";
import { useFirstBlock } from "../stageA/useFirstBlock";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { middlePosition, startPosition } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  const currentLevel = useCurrentLevel();

  useFirstBlock(
    useMemo(
      () => ({
        blockType: BlockType.Domino,
        dominoType: DominoType.First,
        position: new Vector3(...startPosition),
        rotation: new Euler(
          0,
          Math.atan2(
            middlePosition[0] - startPosition[0],
            middlePosition[2] - startPosition[2]
          ),
          0
        ),
      }),
      []
    )
  );

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
