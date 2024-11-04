import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { BlockType } from "../../blocks/blockType";
import { stepDepth, stepHeight } from "../../blocks/BridgeModel";
import { depth as dominoDepth } from "../../blocks/FollowDomino";
import { SlotContext } from "../../controllers/SlotContext";

export function useNextBridging() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const bridge = useMemo(() => {
    const bridges = blocks.filter(
      (block) => block.blockType === BlockType.Bridge
    );

    return bridges.length > 0 ? bridges[bridges.length - 1] : undefined;
  }, [blocks]);

  const relativePosition = useMemo(() => {
    if (bridge) {
      const bridgeIndex = blocks.indexOf(bridge);
      const dominoCount = blocks.length - 1 - bridgeIndex;

      if (dominoCount < 3) {
        return new Vector3(
          0,
          stepHeight * (dominoCount + 1),
          -(bridge.length / 2) + stepDepth * dominoCount + dominoDepth / 2
        );
      } else {
        const gapLength = bridge.length - stepDepth * 6 - dominoDepth;
        const gapSize = 1 + Math.ceil(gapLength / 20);

        if (dominoCount - 3 < gapSize) {
          const gapSpacing = gapLength / (gapSize - 1);
          return new Vector3(
            0,
            stepHeight * 4,
            -(gapLength / 2) + (dominoCount - 3) * gapSpacing
          );
        } else if (dominoCount < 3 + gapSize + 3) {
          const stepIndex = dominoCount - 3 - gapSize;
          return new Vector3(
            0,
            stepHeight * (3 - stepIndex),
            bridge.length / 2 - stepDepth * (2 - stepIndex) - dominoDepth / 2
          );
        } else {
          return undefined;
        }
      }
    } else {
      return undefined;
    }
  }, [blocks, bridge]);

  const absolutePosition = useMemo(() => {
    if (!bridge || !relativePosition) {
      return undefined;
    }

    return relativePosition
      .clone()
      .applyEuler(bridge.rotation)
      .add(bridge.position);
  }, [bridge, relativePosition]);

  return useMemo(
    () =>
      bridge && absolutePosition
        ? {
            lastBridge: bridge,
            nextPosition: absolutePosition,
          }
        : undefined,
    [absolutePosition, bridge]
  );
}
