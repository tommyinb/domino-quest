import { useCallback, useContext, useEffect } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";

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

  useEffect(() => {
    if (blocks.length > 1) {
      setItem((item) => ({
        ...item,
        build: {
          ...item.build,
          retryHandlers: [...item.build.undoHandlers, handler],
        },
      }));

      return () => {
        setItem((item) => ({
          ...item,
          build: {
            ...item.build,
            retryHandlers: item.build.undoHandlers.filter(
              (undoHandler) => undoHandler !== handler
            ),
          },
        }));
      };
    }
  }, [blocks.length, handler, setItem]);
}
