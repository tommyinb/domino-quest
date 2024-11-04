import { Html } from "@react-three/drei";
import { useContext, useEffect, useMemo } from "react";
import { SceneContext } from "../scenes/SceneContext";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { ItemState } from "./itemState";
import { SlotContext } from "./SlotContext";

export function Slot({ item }: Props) {
  const { items, setItems, currentLevel } = useContext(ControllerContext);

  const y = useMemo(
    () =>
      items
        .filter((t) => t.level < item.level)
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
    [item.level, items]
  );

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
    <group position={[0, y, 0]}>
      <SlotContext.Provider value={useMemo(() => ({ item }), [item])}>
        {Math.abs(item.level - currentLevel) <= 1 && (
          <item.start.stageElement />
        )}

        {debug && <Html>{item.state}</Html>}

        {debug && <axesHelper args={[10]} />}
      </SlotContext.Provider>
    </group>
  );
}

interface Props {
  item: Item;
}
