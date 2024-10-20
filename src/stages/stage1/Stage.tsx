import { useContext, useMemo, useState } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { Block } from "../block";
import { BlockType } from "../blockType";
import { StageContext } from "../StageContext";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Play } from "./Play";
import { startPosition } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);

  const [blocks, setBlocks] = useState<Block[]>(() => [
    {
      type: BlockType.First,
      position: new Vector3(...startPosition),
      rotation: new Euler(),
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
