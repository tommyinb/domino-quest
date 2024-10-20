import { animated } from "@react-spring/three";
import { useContext, useEffect, useMemo } from "react";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { ItemState } from "./itemState";
import { SlotContext } from "./SlotContext";

export function Slot({ item }: Props) {
  const { setItems, currentLevel } = useContext(ControllerContext);

  useEffect(() => {
    if (currentLevel === item.level) {
      if (item.state === ItemState.Idle) {
        setItems((oldItems) =>
          oldItems.map((oldItem) =>
            oldItem.level === item.level
              ? { ...oldItem, state: ItemState.Building }
              : oldItem
          )
        );
      }
    }
  }, [currentLevel, item, setItems]);

  return (
    <animated.group position-y={(item.level - 1) * slotHeight}>
      <SlotContext.Provider value={useMemo(() => ({ item }), [item])}>
        {Math.abs(item.level - currentLevel) <= 1 && (
          <item.start.stageElement />
        )}
      </SlotContext.Provider>
    </animated.group>
  );
}

interface Props {
  item: Item;
}

export const slotHeight = 500;
