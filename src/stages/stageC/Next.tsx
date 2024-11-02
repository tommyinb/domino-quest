import { useContext, useEffect, useState } from "react";
import { BlockType } from "../../blocks/blockType";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "./NextBridge";
import { NextDomino } from "./NextDomino";

export function Next() {
  const { item } = useContext(SlotContext);
  const blockType = item.build.selectedNext?.blockType ?? BlockType.Domino;

  const setBuild = useSetSlotBuild();
  useEffect(
    () =>
      setBuild((build) => {
        if (build.availableNexts.length > 0 && build.selectedNext) {
          return build;
        } else {
          const domino = { blockType: BlockType.Domino, limit: undefined };
          const bridge = { blockType: BlockType.Bridge, limit: undefined };

          return {
            ...build,
            availableNexts: [domino, bridge],
            selectedNext: domino,
          };
        }
      }),
    [setBuild]
  );

  const firstAngle = Math.PI / 4;
  const [nextAngle, setNextAngle] = useState(firstAngle);

  useUndo(setNextAngle, firstAngle);
  useRetry(setNextAngle, firstAngle);

  return (
    <>
      {blockType === BlockType.Domino && (
        <NextDomino nextAngle={nextAngle} setNextAngle={setNextAngle} />
      )}

      {blockType === BlockType.Bridge && (
        <NextBridge nextAngle={nextAngle} setNextAngle={setNextAngle} />
      )}
    </>
  );
}
