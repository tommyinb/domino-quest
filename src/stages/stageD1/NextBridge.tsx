import { Dispatch, SetStateAction, useContext, useMemo } from "react";
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
import { useBridgeBuildNext } from "../stageC/useBridgeBuildNext";
import { useBridgeClick } from "../stageC/useBridgeClick";
import { useGesture } from "../stageC/useGesture";

export function NextBridge({ nextAngle, setNextAngle }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const lastBridge = useMemo(() => {
    const lastBlock = blocks[blocks.length - 1];
    return lastBlock?.blockType === BlockType.Bridge;
  }, [blocks]);
  useBridgeBuildNext(!lastBridge);

  const selected = item.build.selectedNext?.blockType === BlockType.Bridge;
  const enabled = !lastBridge && selected;

  const outputAngle = useMemo(() => nextAngle % (Math.PI * 2), [nextAngle]);
  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, 15 + length / 2, outputAngle),
    [lastPosition, outputAngle]
  );

  useGesture(lastPosition, nextPosition, setNextAngle, enabled);

  useBridgeClick(nextPosition, outputAngle, length, enabled);

  const built = useBuilt();

  return (
    <>
      {item.state === ItemState.Building && !built && enabled && (
        <group position={nextPosition} rotation={[0, outputAngle, 0]}>
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
  nextAngle: number;
  setNextAngle: Dispatch<SetStateAction<number>>;
}

export const length = 120;
