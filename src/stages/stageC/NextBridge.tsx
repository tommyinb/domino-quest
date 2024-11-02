import { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { Vector3Tuple } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino as NextDominoA } from "../stageA/NextDomino";
import { useClick } from "../stageA/useClick";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { useGesture } from "../stageB2/useGesture";
import { getPathParameters } from "./getPathParameters";

export function NextBridge({ nextAngle, setNextAngle }: Props) {
  const outputAngle = useMemo(() => nextAngle % (Math.PI * 2), [nextAngle]);
  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, 60, outputAngle),
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
        <NextDominoA position={nextPosition} rotation={[0, outputAngle, 0]} />
      )}
    </>
  );
}

interface Props {
  nextAngle: number;
  setNextAngle: Dispatch<SetStateAction<number>>;
}
