import { useCallback, useContext } from "react";
import { ControllerContext } from "./ControllerContext";
import { SlotContext } from "./SlotContext";
import { Item } from "./item";

export function useSetSlotItem() {
  const { item } = useContext(SlotContext);

  const { setItems } = useContext(ControllerContext);

  return useCallback(
    (setter: (item: Item) => Item) => {
      setItems((oldItems) => {
        const newOutput = oldItems.map((oldItem) => {
          if (oldItem.level === item.level) {
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
    [item.level, setItems]
  );
}
