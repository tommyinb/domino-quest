import { useCallback } from "react";
import { ItemState } from "./itemState";
import { useSetSlotItem } from "./useSetSlotItem";

export function useSetSlotState() {
  const setSlotItem = useSetSlotItem();

  return useCallback(
    (state: ItemState) => {
      setSlotItem((item) => {
        return item.state === state ? item : { ...item, state };
      });
    },
    [setSlotItem]
  );
}
