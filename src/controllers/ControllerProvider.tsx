import { PropsWithChildren, useMemo, useState } from "react";
import * as start1 from "../stages/stage1/start";
import * as start2 from "../stages/stage2/start";
import * as start3 from "../stages/stage3/start";
import * as start4 from "../stages/stage4/start";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { ItemState } from "./itemState";

export function ControllerProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>(() => [
    { level: 1, start: start4, state: ItemState.Building },
    { level: 2, start: start2, state: ItemState.Idle },
    { level: 3, start: start3, state: ItemState.Idle },
    { level: 4, start: start1, state: ItemState.Idle },
  ]);

  const [currentLevel, setCurrentLevel] = useState(1);

  const [gestures, setGestures] = useState<string[]>([]);

  return (
    <ControllerContext.Provider
      value={useMemo(
        () => ({
          items,
          setItems,
          currentLevel,
          setCurrentLevel,
          gestures,
          setGestures,
        }),
        [currentLevel, gestures, items]
      )}
    >
      {children}
    </ControllerContext.Provider>
  );
}
