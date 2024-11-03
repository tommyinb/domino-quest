import { useEffect } from "react";
import { BlockType } from "../../blocks/blockType";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";

export function useDominoBuildNext() {
  const setBuild = useSetSlotBuild();

  useEffect(() => {
    setBuild((build) => {
      if (
        build.availableNexts.some((next) => next.blockType === BlockType.Domino)
      ) {
        return build;
      } else {
        const domino = {
          blockType: BlockType.Domino,
          limit: undefined,
          enabled: true,
        };

        return {
          ...build,
          availableNexts: [domino, ...build.availableNexts],
        };
      }
    });

    return () =>
      setBuild((build) => ({
        ...build,
        availableNexts: build.availableNexts.filter(
          (next) => next.blockType !== BlockType.Domino
        ),
      }));
  }, [setBuild]);

  useEffect(() => {
    setBuild((build) => {
      if (build.selectedNext) {
        return build;
      } else {
        const domino = build.availableNexts.find(
          (next) => next.blockType === BlockType.Domino
        );
        if (domino) {
          return {
            ...build,
            selectedNext: domino,
          };
        } else {
          return build;
        }
      }
    });

    return () =>
      setBuild((build) => {
        if (build.selectedNext?.blockType === BlockType.Domino) {
          return {
            ...build,
            selectedNext: undefined,
          };
        } else {
          return build;
        }
      });
  }, [setBuild]);
}
