import { Box } from "@react-three/drei";
import { useContext, useMemo } from "react";
import { Vector3, Vector3Tuple } from "three";
import { BlockType } from "../../blocks/blockType";
import { depth, height, width } from "../../blocks/FollowDomino";
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
  steeringSize,
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

  const steeringPreviews = useMemo(() => {
    const previews: { position: Vector3; angle: number }[] = [];

    let position = nextPosition;
    let angle = facingAngle + steeringAngle;

    const previewCount = Math.max(steeringSize / 5, 3);
    for (let i = 0; i < previewCount; i++) {
      position = getNextPosition(
        new Vector3(position.x, 0, position.z),
        distance,
        angle + steeringAngle
      );

      angle += steeringAngle * 2;

      previews.push({ position, angle });
    }

    return previews;
  }, [facingAngle, nextPosition, steeringAngle, steeringSize]);

  const built = useBuilt();

  return (
    <>
      {enabled && item.state === ItemState.Building && !built && (
        <>
          <NextDomino position={nextPosition} rotation={[0, outputAngle, 0]} />

          {steeringPreviews.map((preview, index) => (
            <Box
              key={index}
              args={[width, height, depth]}
              position={[
                preview.position.x,
                preview.position.y + height / 2,
                preview.position.z,
              ]}
              rotation={[0, preview.angle, 0]}
            >
              <meshToonMaterial
                color={0x4ecdc4}
                opacity={0.2}
                transparent={true}
              />
            </Box>
          ))}
        </>
      )}
    </>
  );
}

interface Props {
  facingAngle: number;
  setFacingAngle: (angle: number) => void;

  steeringSize: number;
  steeringAngle: number;
  steer: (side: number) => void;

  endPosition: Vector3Tuple;
}

export const distance = 15;
