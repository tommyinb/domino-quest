import { useCallback, useContext, useEffect } from "react";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { FooterContext } from "../../footers/FooterContext";

export function useRetry(
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
        blocks: blocks.slice(0, 1),
      },
    }));

    setNextAngle(firstAngle);
  }, [blocks, firstAngle, setItem, setNextAngle]);

  const { setRetryHandlers } = useContext(FooterContext);
  useEffect(() => {
    if (item.state === ItemState.Building && blocks.length > 1) {
      setRetryHandlers((handlers) => [...handlers, handler]);

      return () =>
        setRetryHandlers((handlers) =>
          handlers.filter((retryHandler) => retryHandler !== handler)
        );
    }
  }, [blocks.length, handler, item.state, setRetryHandlers]);
}
