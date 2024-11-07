import { useCallback, useContext } from "react";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { useCurrentLevel } from "./useCurrentLevel";

export function useSetCurrentItem() {
  const { setItems } = useContext(ControllerContext);

  const level = useCurrentLevel();

  return useCallback(
    (setter: (item: Item) => Item) => {
      setItems((oldItems) => {
        const newOutput = oldItems.map((oldItem) => {
          if (oldItem.level === level) {
            const newItem = setter(oldItem);

            return {
              changed: newItem !== oldItem,
              item: newItem,
            };
          } else {
            return {
              changed: false,
              item: oldItem,
            };
          }
        });

        if (!newOutput.some((item) => item.changed)) {
          return oldItems;
        }

        return newOutput.map((item) => item.item);
      });
    },
    [level, setItems]
  );
}
