import { useCallback, useContext, useEffect } from "react";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { FooterContext } from "../../footers/FooterContext";

export function useUndo(
  setNextAngle: (angle: number) => void,
  firstAngle: number
) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const setItem = useSetSlotItem();
  const handler = useCallback(() => {
    setItem((item) => ({
      ...item,
      build: {
        ...item.build,
        blocks: blocks.slice(0, -1),
      },
    }));

    if (blocks.length > 2) {
      const fromBlock = blocks[blocks.length - 2];
      const toBlock = blocks[blocks.length - 1];

      const angle = Math.atan2(
        toBlock.position.x - fromBlock.position.x,
        toBlock.position.z - fromBlock.position.z
      );
      setNextAngle(angle);
    } else {
      setNextAngle(firstAngle);
    }
  }, [blocks, firstAngle, setNextAngle, setItem]);

  const { setUndoHandlers } = useContext(FooterContext);
  useEffect(() => {
    if (item.state === ItemState.Building && blocks.length > 1) {
      setUndoHandlers((handlers) => [...handlers, handler]);

      return () =>
        setUndoHandlers((handlers) =>
          handlers.filter((undoHandler) => undoHandler !== handler)
        );
    }
  }, [blocks.length, handler, item.state, setUndoHandlers]);
}
