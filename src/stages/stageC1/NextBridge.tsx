import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { BlockType } from "../../blocks/blockType";
import {
  boardThickness,
  BridgeModel,
  stepDepth,
  stepHeight,
} from "../../blocks/BridgeModel";
import { width } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { SettingContext } from "../../settings/SettingContext";
import { Selection } from "../stageA/Selection";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "../stageB1/getNextPosition";
import { useBridgeBuildNext } from "./useBridgeBuildNext";
import { useBridgeClick } from "./useBridgeClick";
import { useGesture } from "./useGesture";

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

  const bridged = useMemo(
    () => blocks.some((block) => block.blockType === BlockType.Bridge),
    [blocks]
  );
  useGesture(
    lastPosition,
    nextPosition,
    useCallback(
      (side) => setNextAngle((angle) => angle + (side * Math.PI) / 9),
      [setNextAngle]
    ),
    enabled && bridged
  );

  useBridgeClick(nextPosition, outputAngle, length, enabled);

  const built = useBuilt();

  const { formActive } = useContext(SettingContext);

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

          {!bridged && !formActive && (
            <Hint
              position={[0, stepHeight * 4, 10]}
              en="Bridge the junction!"
              zh="交差點搭橋！"
              ja="橋をかける"
            />
          )}
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
