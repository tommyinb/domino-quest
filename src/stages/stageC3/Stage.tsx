import { useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { Play } from "../Play";
import { useFirstBlock } from "../stageA/useFirstBlock";
import { getStations } from "./getStations";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Path } from "./Path";

export function Stage() {
  const { item } = useContext(SlotContext);

  const currentLevel = useCurrentLevel();

  useFirstBlock(
    useMemo(() => {
      const { start } = getStations();

      return {
        blockType: BlockType.Domino,
        dominoType: DominoType.First,
        position: new Vector3(...start),
        rotation: new Euler(0, Math.PI * 1.1, 0),
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
