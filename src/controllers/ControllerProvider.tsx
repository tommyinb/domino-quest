import { PropsWithChildren, useMemo, useState } from "react";
import * as start1 from "../stages/stage1/start";
import * as start2 from "../stages/stage2/start";
import * as start3 from "../stages/stage3/start";
import * as start4 from "../stages/stage4/start";
import { ControllerContext } from "./ControllerContext";
import { GestureMode } from "./gestureMode";
import { Item } from "./item";
import { ItemState } from "./itemState";

export function ControllerProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>(() => [
    { level: 1, start: start1, state: ItemState.Building, blocks: [] },
    { level: 2, start: start2, state: ItemState.Idle, blocks: [] },
    { level: 3, start: start3, state: ItemState.Idle, blocks: [] },
    { level: 4, start: start4, state: ItemState.Idle, blocks: [] },
  ]);

  const [currentLevel, setCurrentLevel] = useState(1);

  const [gestureMode, setGestureMode] = useState(GestureMode.Steer);

  return (
    <ControllerContext.Provider
      value={useMemo(
        () => ({
          items,
          setItems,
          currentLevel,
          setCurrentLevel,
          gestureMode,
          setGestureMode,
        }),
        [currentLevel, gestureMode, items]
      )}
    >
      {children}
    </ControllerContext.Provider>
  );
}
