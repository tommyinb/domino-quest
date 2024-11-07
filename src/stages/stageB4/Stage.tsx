import { useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { Play } from "../Play";
import { useFirstBlock } from "../stageA/useFirstBlock";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";
import { endPosition, startPosition } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  const currentLevel = useCurrentLevel();

  useFirstBlock(
    useMemo(
      () => ({
        blockType: BlockType.Domino,
        dominoType: DominoType.First,
        position: new Vector3(...startPosition),
        rotation: new Euler(0, -Math.PI / 2, 0),
      }),
      []
    )
  );

  return (
    <>
      <Ground />

      {item.level === currentLevel && (
        <Next stationPositions={[startPosition, endPosition]} />
      )}

      <Play key={item.round}>
        <Path />
      </Play>
    </>
  );
}
