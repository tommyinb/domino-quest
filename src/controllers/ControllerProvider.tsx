import { PropsWithChildren, useMemo, useState } from "react";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { ItemState } from "./itemState";

export function ControllerProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>(() => [
    {
      level: 1,
      state: ItemState.Building,
    },
    {
      level: 2,
      state: ItemState.Idle,
    },
  ]);

  const [currentLevel, setCurrentLevel] = useState(1);

  return (
    <ControllerContext.Provider
      value={useMemo(
        () => ({ items, setItems, currentLevel, setCurrentLevel }),
        [currentLevel, items]
      )}
    >
      {children}
    </ControllerContext.Provider>
  );
}