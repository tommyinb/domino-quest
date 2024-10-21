import { useCallback, useContext } from "react";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";

export function useSetCurrentItem() {
  const { currentLevel, setItems } = useContext(ControllerContext);

  return useCallback(
    (setter: (item: Item) => Item) => {
      setItems((oldItems) => {
        const newOutput = oldItems.map((oldItem) => {
          if (oldItem.level === currentLevel) {
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
    [currentLevel, setItems]
  );
}
