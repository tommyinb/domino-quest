import { useContext } from "react";
import { Vector3Tuple } from "three";
import { BlockType } from "../../blocks/blockType";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "../stageA/NextDomino";
import { useDominoClick } from "../stageC/useDominoClick";
import { useNextBridging } from "../stageC/useNextBridging";

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

  return (
    <>
      {bridging && selected && item.state === ItemState.Building && !built && (
        <NextDomino
          position={bridging.nextPosition}
          rotation={bridging.lastBridge.rotation}
        />
      )}
    </>
  );
}

interface Props {
  endPosition: Vector3Tuple;
}
