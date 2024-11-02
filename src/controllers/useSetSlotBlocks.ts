import { useCallback } from "react";
import { Block } from "../blocks/block";
import { useSetSlotItem } from "./useSetSlotItem";

export function useSetSlotBlocks() {
  const setSlotItem = useSetSlotItem();

  return useCallback(
    (setter: (blocks: Block[]) => Block[]) => {
      setSlotItem((item) => {
        const blocks = setter(item.build.blocks);
        if (blocks === item.build.blocks) {
          return item;
        } else {
          return {
            ...item,
            build: {
              ...item.build,
              blocks,
            },
          };
        }
      });
    },
    [setSlotItem]
  );
}
