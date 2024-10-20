import { useContext, useMemo, useState } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { Block } from "../block";
import { BlockType } from "../blockType";
import { Play } from "../stage1/Play";
import { Ground } from "../stage3/Ground";
import { Next } from "../stage3/Next";
import { StageContext } from "../StageContext";
import { stationPositions } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  const [blocks, setBlocks] = useState<Block[]>(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    return [
      {
        type: BlockType.First,
        position: new Vector3(...startPosition),
        rotation: new Euler(
          0,
          Math.atan2(
            secondPosition[0] - startPosition[0],
            secondPosition[2] - startPosition[2]
          ),
          0
        ),
      },
    ];
  });

  return (
    <StageContext.Provider
      value={useMemo(() => ({ blocks, setBlocks }), [blocks])}
    >
      <Ground stationPositions={stationPositions} />

      {item.state === ItemState.Building && (
        <Next stationPositions={stationPositions} />
      )}

      <Play />
    </StageContext.Provider>
  );
}
