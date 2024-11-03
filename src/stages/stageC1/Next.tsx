import { useEffect, useState } from "react";
import { BlockType } from "../../blocks/blockType";
import { useSetSlotBuild } from "../../controllers/useSetSlotBuild";
import { useRetry } from "../stageB2/useRetry";
import { useUndo } from "../stageB2/useUndo";
import { NextBridge } from "./NextBridge";
import { NextDomino } from "./NextDomino";

export function Next() {
  const setBuild = useSetSlotBuild();
  useEffect(
    () =>
      setBuild((build) => {
        if (build.availableNexts.length > 0 && build.selectedNext) {
          return build;
        } else {
          const domino = {
            blockType: BlockType.Domino,
            limit: undefined,
            enabled: true,
          };
          const bridge = {
            blockType: BlockType.Bridge,
            limit: undefined,
            enabled: true,
          };

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
      <NextDomino nextAngle={nextAngle} setNextAngle={setNextAngle} />

      <NextBridge nextAngle={nextAngle} setNextAngle={setNextAngle} />
    </>
  );
}
