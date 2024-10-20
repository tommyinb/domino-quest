import { useContext, useMemo, useState } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { Block } from "../block";
import { BlockType } from "../blockType";
import { Play } from "../stage1/Play";
import { StageContext } from "../StageContext";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { middlePosition, startPosition } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  const [blocks, setBlocks] = useState<Block[]>(() => [
    {
      type: BlockType.First,
      position: new Vector3(0, 0, 75),
      rotation: new Euler(
        0,
        Math.atan2(
          middlePosition[0] - startPosition[0],
          middlePosition[2] - startPosition[2]
        ),
        0
      ),
    },
  ]);

  return (
    <StageContext.Provider
      value={useMemo(() => ({ blocks, setBlocks }), [blocks])}
    >
      <Ground />

      {item.state === ItemState.Building && <Next />}

      <Play />
    </StageContext.Provider>
  );
}
