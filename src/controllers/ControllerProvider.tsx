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
  const [items, setItems] = useState<Item[]>(() =>
    [
      { level: 1, start: start1 },
      { level: 2, start: start2 },
      { level: 3, start: start3 },
      { level: 4, start: start4 },
    ].map((content) => ({
      ...content,
      state: ItemState.Idle,
      build: {
        blocks: [],
        undoHandlers: [],
        retryHandlers: [],
      },
      round: 0,
    }))
  );

  const [currentLevel, setCurrentLevel] = useState(1);

  const [gestureMode, setGestureMode] = useState(GestureMode.Build);

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
