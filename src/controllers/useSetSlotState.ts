import { useCallback, useContext } from "react";
import { ControllerContext } from "./ControllerContext";
import { ItemState } from "./itemState";
import { SlotContext } from "./SlotContext";

export function useSetSlotState() {
  const { item } = useContext(SlotContext);

  const { setItems } = useContext(ControllerContext);

  return useCallback(
    (state: ItemState) => {
      setItems((oldItems) =>
        oldItems.map((oldItem) =>
          oldItem.level === item.level ? { ...oldItem, state } : oldItem
        )
      );
    },
    [item.level, setItems]
  );
}
