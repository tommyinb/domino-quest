import { useContext, useMemo, useState } from "react";
import { Vector3, Vector3Tuple } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useBuilt } from "../../dominos/useBuilt";
import { NextDomino } from "../stage1/NextDomino";
import { useClick } from "../stage1/useClick";
import { useGesture } from "../stage3/useGesture";
import { useRetry } from "../stage3/useRetry";
import { useUndo } from "../stage3/useUndo";

export function Next({ stationPositions }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const firstAngle = -(Math.PI / 2 + Math.PI / 18);
  const [nextAngle, setNextAngle] = useState(firstAngle);
  const outputAngle = useMemo(() => nextAngle % (Math.PI * 2), [nextAngle]);

  const direction = useMemo(
    () =>
      new Vector3(Math.sin(outputAngle) * 20, 0, Math.cos(outputAngle) * 20),
    [outputAngle]
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
  useClick(nextPosition, outputAngle, endPosition);

  const built = useBuilt();
  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, outputAngle, 0]} />
      )}
    </>
  );
}

interface Props {
  stationPositions: Vector3Tuple[];
}
