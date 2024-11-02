import { useCallback } from "react";
import { ItemBuild } from "./itemBuild";
import { useSetSlotItem } from "./useSetSlotItem";

export function useSetSlotBuild() {
  const setSlotItem = useSetSlotItem();

  return useCallback(
    (setter: (build: ItemBuild) => ItemBuild) => {
      setSlotItem((item) => {
        const build = setter(item.build);
        if (build === item.build) {
          return item;
        } else {
          return {
            ...item,
            build,
          };
        }
      });
    },
    [setSlotItem]
  );
}
