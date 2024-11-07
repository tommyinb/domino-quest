import { Text } from "@react-three/drei";
import { useContext, useEffect, useMemo } from "react";
import { SettingContext } from "../settings/SettingContext";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { ItemState } from "./itemState";
import { SlotContext } from "./SlotContext";

export function Slot({ item }: Props) {
  const { items, setItems, levels } = useContext(ControllerContext);

  const y = useMemo(
    () =>
      items
        .filter((t) => t.level < item.level)
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
    [item.level, items]
  );

  const level = levels[levels.length - 1];

  useEffect(() => {
    if (item.level === level) {
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
  }, [item.level, item.state, level, setItems]);

  const { debug } = useContext(SettingContext);

  return (
    <group position={[0, y, 0]}>
      <SlotContext.Provider value={useMemo(() => ({ item }), [item])}>
        {Math.abs(item.level - level) <= 1 && <item.start.stageElement />}

        {debug && (
          <>
            <axesHelper args={[10]} />

            <Text scale={[10, 10, 10]} position={[0, 50, -10]}>
              {item.state}
            </Text>

            <Text scale={[10, 10, 10]} position={[0, 50, 10]}>
              blocks: {item.build.blocks.length}
            </Text>
          </>
        )}
      </SlotContext.Provider>
    </group>
  );
}

interface Props {
  item: Item;
}
