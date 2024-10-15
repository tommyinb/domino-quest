import { useMemo, useState } from "react";
import { StageState } from "../stages/stageState";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { Slot } from "./Slot";

export function Controller() {
  const [items, setItems] = useState<Item[]>(() => [
    {
      majorLevel: 1,
      minorLevel: 1,
      state: StageState.Building,
    },
    {
      majorLevel: 1,
      minorLevel: 2,
      state: StageState.Idle,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ControllerContext.Provider
      value={useMemo(
        () => ({ items, setItems, currentIndex, setCurrentIndex }),
        [currentIndex, items]
      )}
    >
      {items.map((item, index) => (
        <Slot
          key={`${index}-${item.majorLevel}-${item.minorLevel}`}
          index={index}
        />
      ))}
    </ControllerContext.Provider>
  );
}
