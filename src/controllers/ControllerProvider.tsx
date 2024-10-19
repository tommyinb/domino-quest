import { PropsWithChildren, useMemo, useState } from "react";
import { StageState } from "../stages/stageState";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";

export function ControllerProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>(() => [
    {
      level: 1,
      state: StageState.Building,
    },
    {
      level: 2,
      state: StageState.Idle,
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
