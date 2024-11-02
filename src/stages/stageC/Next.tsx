import { useContext, useMemo, useState } from "react";
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
import { getPathParameters } from "./getPathParameters";

export function Next() {
  const firstAngle = Math.PI / 4;
  const [nextAngle, setNextAngle] = useState(firstAngle);
  const outputAngle = useMemo(() => nextAngle % (Math.PI * 2), [nextAngle]);

  useUndo(setNextAngle, firstAngle);
  useRetry(setNextAngle, firstAngle);

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, 20, outputAngle),
    [lastPosition, outputAngle]
  );
  useGesture(lastPosition, nextPosition, setNextAngle);

  const { pointX, pointY } = useMemo(getPathParameters, []);
  const endPosition = useMemo<Vector3Tuple>(
    () => [-pointX, 0, -pointY],
    [pointX, pointY]
  );
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
