import { animated, useSpring } from "@react-spring/three";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Stage } from "../stages/Stage";
import { StageState } from "../stages/stageState";
import { ControllerContext } from "./ControllerContext";

export function Slot({ index: slotIndex }: Props) {
  const { items, setItems, currentIndex, setCurrentIndex } =
    useContext(ControllerContext);

  const item = useMemo(() => items[slotIndex], [items, slotIndex]);
  const setState = useCallback(
    (state: StageState) => {
      const newItems = [...items];
      newItems[slotIndex] = { ...item, state };

      setItems(newItems);

      if (state === StageState.Success) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    [currentIndex, item, items, setCurrentIndex, setItems, slotIndex]
  );

  const indexDifference = slotIndex - currentIndex;
  useEffect(() => {
    if (indexDifference === 0) {
      if (item && item.state === StageState.Idle) {
        setState(StageState.Building);
      }
    }
  }, [indexDifference, item, setState]);

  const { y } = useSpring({ y: indexDifference * 500 });

  return (
    <animated.group position-y={y}>
      {item && Math.abs(indexDifference) <= 1 && (
        <Stage state={item.state} setState={setState} />
      )}
    </animated.group>
  );
}

interface Props {
  index: number;
}
