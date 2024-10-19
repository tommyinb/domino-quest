import { animated } from "@react-spring/three";
import { useCallback, useContext, useEffect } from "react";
import { Stage } from "../stages/Stage";
import { StageState } from "../stages/stageState";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";

export function Slot({ item }: Props) {
  const { items, setItems, currentLevel } = useContext(ControllerContext);

  const setState = useCallback(
    (state: StageState) => {
      setItems(
        items.map((oldItem) =>
          oldItem.level === item.level ? { ...oldItem, state } : oldItem
        )
      );
    },
    [item, items, setItems]
  );

  useEffect(() => {
    if (currentLevel === item.level) {
      if (item && item.state === StageState.Idle) {
        setState(StageState.Building);
      }
    }
  }, [currentLevel, item, setState]);

  return (
    <animated.group position-y={(item.level - 1) * slotHeight}>
      {Math.abs(item.level - currentLevel) <= 1 && (
        <Stage state={item.state} setState={setState} />
      )}
    </animated.group>
  );
}

interface Props {
  item: Item;
}

export const slotHeight = 500;
