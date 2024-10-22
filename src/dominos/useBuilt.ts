import { useContext, useMemo } from "react";
import { SlotContext } from "../controllers/SlotContext";
import { BlockType } from "./blockType";

export function useBuilt() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return useMemo(
    () => blocks.some((block) => block.type === BlockType.Last),
    [blocks]
  );
}
