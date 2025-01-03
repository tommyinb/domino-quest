import { useCallback, useContext, useMemo, useState } from "react";
import { Vector3Tuple } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "../stageA/NextDomino";
import { useClick } from "../stageA/useClick";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { useGesture } from "../stageB2/useGesture";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";

export function Next() {
  const firstAngle = Math.PI / 2;
  const [nextAngle, setNextAngle] = useState(firstAngle);
  const outputAngle = useMemo(() => nextAngle % (Math.PI * 2), [nextAngle]);

  useUndo(setNextAngle, firstAngle);
  useRetry(setNextAngle, firstAngle);

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, 20, outputAngle),
    [lastPosition, outputAngle]
  );
  useGesture(
    lastPosition,
    nextPosition,
    useCallback(
      (side) => setNextAngle((angle) => angle + (side * Math.PI) / 9),
      []
    )
  );

  const endPosition = useMemo<Vector3Tuple>(() => [0, 0, 180], []);
  useClick(nextPosition, outputAngle, endPosition);

  const { item } = useContext(SlotContext);
  const built = useBuilt();

  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, outputAngle, 0]} />
      )}
    </>
  );
}
