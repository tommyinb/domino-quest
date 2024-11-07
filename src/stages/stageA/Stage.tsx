import { useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { Play } from "../Play";
import { Ground } from "./Ground";
import { Judge } from "./Judge";
import { Next } from "./Next";
import { startPosition } from "./start";
import { useFirstBlock } from "./useFirstBlock";

export function Stage() {
  const { item } = useContext(SlotContext);

  const currentLevel = useCurrentLevel();

  useFirstBlock(
    useMemo(
      () => ({
        blockType: BlockType.Domino,
        dominoType: DominoType.First,
        position: new Vector3(...startPosition),
        rotation: new Euler(0, Math.PI, 0),
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
