import { useContext, useMemo, useState } from "react";
import { Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { Block } from "../../dominos/block";
import { BlockType } from "../../dominos/blockType";
import { Play } from "../../dominos/Play";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { StageContext } from "./StageContext";

export function Stage() {
  const { item } = useContext(SlotContext);

  const [blocks, setBlocks] = useState<Block[]>(() => [
    {
      type: BlockType.First,
      position: new Vector3(0, 0, 75),
    },
  ]);

  return (
    <StageContext.Provider
      value={useMemo(
        () => ({
          blocks,
          setBlocks,
          endPosition: new Vector3(0, 0, -75),
        }),
        [blocks]
      )}
    >
      <Ground />

      {item.state === ItemState.Building && <Next />}

      <Play />
    </StageContext.Provider>
  );
}
