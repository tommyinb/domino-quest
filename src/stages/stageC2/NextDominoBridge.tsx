import { useContext } from "react";
import { Vector3Tuple } from "three";
import { BlockType } from "../../blocks/blockType";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { SettingContext } from "../../settings/SettingContext";
import { NextDomino } from "../stageA/NextDomino";
import { useDominoClick } from "../stageC1/useDominoClick";
import { useNextBridging } from "../stageC1/useNextBridging";

export function NextDominoBridge({ endPosition }: Props) {
  const bridging = useNextBridging();

  useDominoClick(
    bridging?.nextPosition,
    bridging?.lastBridge.rotation.y ?? 0,
    endPosition
  );

  const { item } = useContext(SlotContext);
  const selected = item.build.selectedNext?.blockType === BlockType.Domino;

  const built = useBuilt();

  const { formActive } = useContext(SettingContext);

  return (
    <>
      {bridging && selected && item.state === ItemState.Building && !built && (
        <NextDomino
          position={bridging.nextPosition}
          rotation={bridging.lastBridge.rotation}
        >
          {item.build.blocks.length === 2 &&
            item.build.blocks[1].blockType === BlockType.Bridge &&
            !formActive && (
              <Hint position={[0, height, 0]} en="Press" zh="按下" ja="押す" />
            )}
        </NextDomino>
      )}
    </>
  );
}

interface Props {
  endPosition: Vector3Tuple;
}
