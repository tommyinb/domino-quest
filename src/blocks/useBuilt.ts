import { useContext, useMemo } from "react";
import { SlotContext } from "../controllers/SlotContext";
import { BlockType } from "./blockType";
import { DominoType } from "./dominoType";

export function useBuilt() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return useMemo(
    () =>
      blocks.some(
        (block) =>
          block.blockType === BlockType.Domino &&
          block.dominoType === DominoType.Last
      ),
    [blocks]
  );
}
