import { useContext, useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { PlayContext } from "../PlayContext";
import { getPathLines } from "./getPathLines";

export function useJudge(lines: ReturnType<typeof getPathLines>) {
  const allPoints = useMemo(
    () =>
      lines.flatMap((line) =>
        Array.from({ length: 10 }).map((_, i) =>
          line.from.clone().lerp(line.to, (0.5 + i) / 10)
        )
      ),
    [lines]
  );

  const { item } = useContext(SlotContext);
  const { blocks } = item.build;
  const targets = useMemo(
    () =>
      allPoints.map((point) => {
        const pairs = blocks
          .map((block, index) => ({ block, index }))
          .filter((pair) => {
            const distance = new Vector3(
              pair.block.position.x,
              point.y,
              pair.block.position.z
            ).distanceTo(point);

            return distance <= 20;
          });

        return {
          point,
          pairs,
        };
      }),
    [allPoints, blocks]
  );

  const { tippeds } = useContext(PlayContext);
  const progress = useMemo(() => {
    const tippedTargets = targets.filter((target) =>
      target.pairs.map((pair) => pair.index).some((index) => tippeds[index])
    );

    return tippedTargets.length / targets.length;
  }, [targets, tippeds]);

  const setSlotState = useSetSlotState();
  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (progress >= 1) {
        setSlotState(ItemState.Success);
      } else {
        if (tippeds) {
          const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [item.state, progress, setSlotState, tippeds]);
}
