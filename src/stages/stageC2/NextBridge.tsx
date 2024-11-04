import { useContext, useMemo } from "react";
import { BlockType } from "../../blocks/blockType";
import {
  boardThickness,
  BridgeModel,
  stepDepth,
} from "../../blocks/BridgeModel";
import { width } from "../../blocks/FollowDomino";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { Selection } from "../stageA/Selection";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { useBridgeBuildNext } from "../stageC1/useBridgeBuildNext";
import { useBridgeClick } from "../stageC1/useBridgeClick";
import { useGesture } from "../stageC1/useGesture";
import { distance } from "./NextDominoGround";

export function NextBridge({ angle, steer }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const lastBridge = useMemo(() => {
    const lastBlock = blocks[blocks.length - 1];
    return lastBlock?.blockType === BlockType.Bridge;
  }, [blocks]);
  useBridgeBuildNext(!lastBridge);

  const selected = item.build.selectedNext?.blockType === BlockType.Bridge;
  const enabled = !lastBridge && selected;

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, distance + length / 2, angle),
    [lastPosition, angle]
  );

  useGesture(lastPosition, nextPosition, steer, enabled);

  useBridgeClick(nextPosition, angle, length, enabled);

  const built = useBuilt();

  return (
    <>
      {item.state === ItemState.Building && !built && enabled && (
        <group position={nextPosition} rotation={[0, angle, 0]}>
          <BridgeModel length={length} opacity={0.4} />

          <Selection
            width={width}
            depth={stepDepth * 3 + boardThickness}
            position={[
              0,
              0.5,
              -(length / 2 - (stepDepth * 3 + boardThickness) / 2),
            ]}
            color={0xffafcc}
          />

          <Selection
            width={width}
            depth={stepDepth * 3 + boardThickness}
            position={[
              0,
              0.5,
              length / 2 - (stepDepth * 3 + boardThickness) / 2,
            ]}
            color={0xffafcc}
          />
        </group>
      )}
    </>
  );
}

interface Props {
  angle: number;
  steer: (side: number) => void;
}

export const length = 120;
