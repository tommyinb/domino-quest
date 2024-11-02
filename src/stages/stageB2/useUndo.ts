import { useContext, useEffect } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";

export function useUndo(
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
        blocks: blocks.slice(0, -1),
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
    };

    setBuild((build) => ({
      ...build,
      undoHandlers: [...build.undoHandlers, handler],
    }));

    return () =>
      setBuild((build) => ({
        ...build,
        undoHandlers: build.undoHandlers.filter(
          (undoHandler) => undoHandler !== handler
        ),
      }));
  }, [blocks, firstAngle, setBuild, setNextAngle]);
}
