import { PropsWithChildren, useMemo, useState } from "react";
import { ControllerContext } from "./ControllerContext";
import { GestureMode } from "./gestureMode";
import { useStoredItems } from "./useStoredItems";
import { useStoredLevels } from "./useStoredLevels";

export function ControllerProvider({ children }: PropsWithChildren) {
  const { items, setItems } = useStoredItems();

  const { levels, setLevels } = useStoredLevels();

  const [gestureMode, setGestureMode] = useState(GestureMode.Build);

  return (
    <ControllerContext.Provider
      value={useMemo(
        () => ({
          items,
          setItems,
          levels,
          setLevels,
          gestureMode,
          setGestureMode,
        }),
        [gestureMode, items, levels, setItems, setLevels]
      )}
    >
      {children}
    </ControllerContext.Provider>
  );
}
