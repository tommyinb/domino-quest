import { useContext, useMemo } from "react";
import { Vector3, Vector3Tuple } from "three";
import { BlockType } from "../../blocks/blockType";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "../stageA/NextDomino";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { useGesture } from "../stageC1/useGesture";
import { useNextBridging } from "../stageC1/useNextBridging";
import { useDominoClick } from "./useDominoClick";

export function NextDominoGround({
  facingAngle,
  setFacingAngle,
  steeringAngle,
  steer,
  endPosition,
}: Props) {
  const { item } = useContext(SlotContext);
  const selected = item.build.selectedNext?.blockType === BlockType.Domino;

  const bridging = useNextBridging();
  const enabled = selected && !bridging;

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () =>
      getNextPosition(
        new Vector3(lastPosition.x, 0, lastPosition.z),
        distance,
        facingAngle + steeringAngle
      ),
    [facingAngle, lastPosition.x, lastPosition.z, steeringAngle]
  );

  useGesture(lastPosition, nextPosition, steer, enabled);

  const outputAngle = facingAngle + steeringAngle * 2;
  useDominoClick(
    enabled ? nextPosition : undefined,
    outputAngle,
    setFacingAngle,
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
  facingAngle: number;
  setFacingAngle: (angle: number) => void;
  steeringAngle: number;
  steer: (side: number) => void;

  endPosition: Vector3Tuple;
}

export const distance = 15;
