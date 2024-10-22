import { useContext, useMemo, useState } from "react";
import { Vector3, Vector3Tuple } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useBuilt } from "../../dominos/useBuilt";
import { NextDomino } from "../stage1/NextDomino";
import { useClick } from "../stage1/useClick";
import { useGesture } from "./useGesture";
import { useRetry } from "./useRetry";
import { useUndo } from "./useUndo";

export function Next({ stationPositions }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const firstAngle = useMemo(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    return Math.atan2(
      secondPosition[0] - startPosition[0],
      secondPosition[2] - startPosition[2]
    );
  }, [stationPositions]);

  const [nextAngle, setNextAngle] = useState(firstAngle);
  const direction = useMemo(
    () => new Vector3(Math.sin(nextAngle) * 20, 0, Math.cos(nextAngle) * 20),
    [nextAngle]
  );

  useUndo(setNextAngle, firstAngle);
  useRetry(setNextAngle, firstAngle);

  const lastPosition = useMemo(
    () => blocks[blocks.length - 1]?.position ?? new Vector3(),
    [blocks]
  );
  const nextPosition = useMemo(
    () => lastPosition.clone().add(direction),
    [direction, lastPosition]
  );
  useGesture(lastPosition, nextPosition, setNextAngle);

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
