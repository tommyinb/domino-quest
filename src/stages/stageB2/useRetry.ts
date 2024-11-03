import { useContext, useEffect } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";

export function useRetry(
  setNextAngle: (angle: number) => void,
  firstAngle: number
) {
  const { item } = useContext(SlotContext);
  const setItem = useSetSlotItem();

  const { blocks } = item.build;

  useEffect(() => {
    if (blocks.length < 2) {
      return;
    }

    const handler = () => {
      setItem((item) => ({
        ...item,
        build: {
          ...item.build,
          blocks: blocks.slice(0, 1),
        },
        round: item.round + 1,
      }));

      setNextAngle(firstAngle);
    };

    setItem((item) => ({
      ...item,
      build: {
        ...item.build,
        retryHandlers: [...item.build.retryHandlers, handler],
      },
    }));

    return () => {
      setItem((item) => ({
        ...item,
        build: {
          ...item.build,
          retryHandlers: item.build.retryHandlers.filter(
            (retryHandler) => retryHandler !== handler
          ),
        },
      }));
    };
  }, [blocks, firstAngle, setItem, setNextAngle]);
}
