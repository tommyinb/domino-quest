import { useCallback, useContext, useMemo, useState } from "react";
import { Vector3Tuple } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "../stageA/NextDomino";
import { useClick } from "../stageA/useClick";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { useGesture } from "./useGesture";
import { useRetry } from "./useRetry";
import { useUndo } from "./useUndo";

export function Next({ stationPositions }: Props) {
  const { item } = useContext(SlotContext);

  const firstAngle = useMemo(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    return Math.atan2(
      secondPosition[0] - startPosition[0],
      secondPosition[2] - startPosition[2]
    );
  }, [stationPositions]);

  const [nextAngle, setNextAngle] = useState(firstAngle);

  useUndo(setNextAngle, firstAngle);
  useRetry(setNextAngle, firstAngle);

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, 20, nextAngle),
    [lastPosition, nextAngle]
  );
  useGesture(
    lastPosition,
    nextPosition,
    useCallback(
      (side) => setNextAngle((angle) => angle + (side * Math.PI) / 9),
      []
    )
  );

  const endPosition = useMemo(
    () => stationPositions[stationPositions.length - 1],
    [stationPositions]
  );
  useClick(nextPosition, nextAngle, endPosition);

  const built = useBuilt();
  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, nextAngle, 0]} />
      )}
    </>
  );
}

interface Props {
  stationPositions: Vector3Tuple[];
}
