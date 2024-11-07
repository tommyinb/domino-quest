import { useEffect } from "react";
import { Block } from "../../blocks/block";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";

export function useFirstBlock(block: Block) {
  const setSlotItem = useSetSlotItem();

  useEffect(
    () =>
      setSlotItem((item) =>
        item.state === ItemState.Building && item.build.blocks.length <= 0
          ? {
              ...item,
              build: {
                ...item.build,
                blocks: [block],
              },
            }
          : item
      ),
    [block, setSlotItem]
  );
}
