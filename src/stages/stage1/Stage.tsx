import { useContext, useEffect } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { BlockType } from "../../dominos/blockType";
import { useBuilt } from "../../dominos/useBuilt";
import { Play } from "../Play";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { startPosition } from "./start";

export function Stage() {
  const { item } = useContext(SlotContext);
  const built = useBuilt();

  const setSlotBlocks = useSetSlotBlocks();
  useEffect(() => {
    setSlotBlocks((blocks) =>
      blocks.length <= 0
        ? [
            {
              type: BlockType.First,
              position: new Vector3(...startPosition),
              rotation: new Euler(),
            },
          ]
        : blocks
    );
  }, [setSlotBlocks]);

  return (
    <>
      <Ground />

      {item.state === ItemState.Building && !built && <Next />}

      <Play key={item.round} />
    </>
  );
}
