import { useContext, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { SlotContext } from "../../controllers/SlotContext";
import { useCurrentLevel } from "../../controllers/useCurrentLevel";
import { Play } from "../Play";
import { Judge } from "../stageA/Judge";
import { useFirstBlock } from "../stageA/useFirstBlock";
import { Ground } from "../stageB2/Ground";
import { Next } from "../stageB2/Next";
import { stationPositions } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  useFirstBlock(
    useMemo(() => {
      const startPosition = stationPositions[0];
      const secondPosition = stationPositions[1];

      return {
        blockType: BlockType.Domino,
        dominoType: DominoType.First,
        position: new Vector3(...startPosition),
        rotation: new Euler(
          0,
          Math.atan2(
            secondPosition[0] - startPosition[0],
            secondPosition[2] - startPosition[2]
          ),
          0
        ),
      };
    }, [])
  );

  const currentLevel = useCurrentLevel();

  return (
    <>
      <Ground stationPositions={stationPositions} />

      {item.level === currentLevel && (
        <Next stationPositions={stationPositions} />
      )}

      <Play key={item.round}>
        <Judge />
      </Play>
    </>
  );
}
