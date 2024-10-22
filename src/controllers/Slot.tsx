import { animated } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { useContext, useEffect, useMemo } from "react";
import { SceneContext } from "../scenes/SceneContext";
import { ControllerContext } from "./ControllerContext";
import { getSlotY } from "./getSlotY";
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

  const { debug } = useContext(SceneContext);

  return (
    <animated.group position-y={getSlotY(item.level)}>
      <SlotContext.Provider value={useMemo(() => ({ item }), [item])}>
        {Math.abs(item.level - currentLevel) <= 1 && (
          <item.start.stageElement />
        )}

        {debug && <Html>{item.state}</Html>}
      </SlotContext.Provider>
    </animated.group>
  );
}

interface Props {
  item: Item;
}
