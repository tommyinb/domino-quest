import { useContext, useMemo, useState } from "react";
import { Vector3, Vector3Tuple } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "../stage1/NextDomino";
import { useNextClick } from "../stage1/useNextClick";
import { useNextGesture } from "./useNextGesture";

export function Next({ stationPositions }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item;

  const [angle, setAngle] = useState(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    return Math.atan2(
      secondPosition[0] - startPosition[0],
      secondPosition[2] - startPosition[2]
    );
  });
  const direction = useMemo(
    () => new Vector3(Math.sin(angle) * 20, 0, Math.cos(angle) * 20),
    [angle]
  );

  const lastPosition = useMemo(
    () => blocks[blocks.length - 1]?.position ?? new Vector3(),
    [blocks]
  );
  const nextPosition = useMemo(
    () => lastPosition.clone().add(direction),
    [direction, lastPosition]
  );
  useNextGesture(lastPosition, nextPosition, setAngle);

  const endPosition = useMemo(
    () => stationPositions[stationPositions.length - 1],
    [stationPositions]
  );
  useNextClick(nextPosition, endPosition);

  return <NextDomino position={nextPosition} rotation={[0, angle, 0]} />;
}

interface Props {
  stationPositions: Vector3Tuple[];
}
