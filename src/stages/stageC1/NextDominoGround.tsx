import { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { Vector3, Vector3Tuple } from "three";
import { BlockType } from "../../blocks/blockType";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "../stageA/NextDomino";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { getPathParameters } from "./getPathParameters";
import { useDominoClick } from "./useDominoClick";
import { useGesture } from "./useGesture";
import { useNextBridging } from "./useNextBridging";

export function NextDominoGround({ nextAngle, setNextAngle }: Props) {
  const { item } = useContext(SlotContext);
  const selected = item.build.selectedNext?.blockType === BlockType.Domino;

  const bridging = useNextBridging();
  const enabled = selected && !bridging;

  const outputAngle = useMemo(() => nextAngle % (Math.PI * 2), [nextAngle]);
  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () =>
      getNextPosition(
        new Vector3(lastPosition.x, 0, lastPosition.z),
        20,
        outputAngle
      ),
    [lastPosition, outputAngle]
  );

  const bridged = item.build.blocks.some(
    (block) => block.blockType === BlockType.Bridge
  );

  useGesture(lastPosition, nextPosition, setNextAngle, enabled && bridged);

  const endPosition = useMemo<Vector3Tuple>(() => {
    const { pointX, pointY } = getPathParameters();
    return [-pointX, 0, -pointY];
  }, []);
  useDominoClick(
    enabled && bridged ? nextPosition : undefined,
    outputAngle,
    endPosition
  );

  const built = useBuilt();

  return (
    <>
      {enabled && item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, outputAngle, 0]} />
      )}
    </>
  );
}

interface Props {
  nextAngle: number;
  setNextAngle: Dispatch<SetStateAction<number>>;
}
