import { useContext, useEffect } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";

export function useRetry(
  setNextAngle: (angle: number) => void,
  firstAngle: number
) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const setBuild = useSetSlotBuild();
  useEffect(() => {
    if (blocks.length < 2) {
      return;
    }

    const handler = () => {
      setBuild((build) => ({
        ...build,
        blocks: blocks.slice(0, 1),
      }));

      setNextAngle(firstAngle);
    };

    setBuild((build) => ({
      ...build,
      retryHandlers: [...build.retryHandlers, handler],
    }));

    return () =>
      setBuild((build) => ({
        ...build,
        retryHandlers: build.retryHandlers.filter(
          (retryHandler) => retryHandler !== handler
        ),
      }));
  }, [blocks, firstAngle, setBuild, setNextAngle]);
}
