import { useCallback } from "react";
import { Block } from "../dominos/block";
import { useSetSlotItem } from "./useSetSlotItem";

export function useSetSlotBlocks() {
  const setSlotItem = useSetSlotItem();

  return useCallback(
    (setter: (blocks: Block[]) => Block[]) => {
      setSlotItem((item) => {
        const blocks = setter(item.blocks);
        if (blocks === item.blocks) {
          return item;
        } else {
          return { ...item, blocks };
        }
      });
    },
    [setSlotItem]
  );
}
