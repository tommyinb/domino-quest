import { useContext, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { PlayContext } from "../PlayContext";

export function useProgress(points: Vector3[]) {
  const [progress, setProgress] = useState(0);

  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const targets = useMemo(
    () =>
      points.map((point) => {
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
    [blocks, points]
  );

  const { tippeds } = useContext(PlayContext);
  useEffect(() => {
    let progress = 0;

    while (progress < targets.length) {
      const target = targets[progress];

      const passed = target.pairs
        .map((pair) => pair.index)
        .some((index) => tippeds[index]);

      if (!passed) {
        break;
      }

      progress++;
    }

    setProgress(progress);
  }, [targets, tippeds]);

  return progress;
}
