import { useContext, useEffect } from "react";
import { Block } from "../../blocks/block";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";

export function useFirstBlock(block: Block) {
  const { item } = useContext(SlotContext);

  const setBlocks = useSetSlotBlocks();

  useEffect(() => {
    if (item.state === ItemState.Building && item.build.blocks.length <= 0) {
      setBlocks((blocks) => (blocks.length <= 0 ? [block] : blocks));
    }
  }, [block, item.build.blocks.length, item.state, setBlocks]);
}
