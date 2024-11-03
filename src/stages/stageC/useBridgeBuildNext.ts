import { useEffect } from "react";
import { BlockType } from "../../blocks/blockType";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";

export function useBridgeBuildNext(enabled: boolean) {
  const setBuild = useSetSlotBuild();

  useEffect(() => {
    setBuild((build) => {
      if (
        build.availableNexts.some((next) => next.blockType === BlockType.Bridge)
      ) {
        return build;
      } else {
        return {
          ...build,
          availableNexts: [
            ...build.availableNexts,
            {
              blockType: BlockType.Bridge,
              limit: undefined,
              enabled,
            },
          ],
        };
      }
    });

    return () =>
      setBuild((build) => ({
        ...build,
        availableNexts: build.availableNexts.filter(
          (next) => next.blockType !== BlockType.Bridge
        ),
      }));
  }, [enabled, setBuild]);
}
