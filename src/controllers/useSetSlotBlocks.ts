import { useCallback } from "react";
import { Block } from "../blocks/block";
import { useSetSlotBuild } from "./useSetSlotBuild";

export function useSetSlotBlocks() {
  const setBuild = useSetSlotBuild();

  return useCallback(
    (setter: (blocks: Block[]) => Block[]) => {
      setBuild((build) => {
        const blocks = setter(build.blocks);
        if (blocks === build.blocks) {
          return build;
        } else {
          return {
            ...build,
            blocks,
          };
        }
      });
    },
    [setBuild]
  );
}
