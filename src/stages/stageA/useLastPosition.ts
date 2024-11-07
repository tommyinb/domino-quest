import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { SlotContext } from "../../controllers/SlotContext";

export function useLastPosition() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return useMemo(
    () =>
      blocks.length > 0 ? blocks[blocks.length - 1].position : new Vector3(),
    [blocks]
  );
}
