import { useContext, useEffect, useState } from "react";
import { Vector3 } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { PlayContext } from "../PlayContext";

export function useProgress(allPoints: Vector3[]) {
  const [progress, setProgress] = useState(0);

  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const { tippeds } = useContext(PlayContext);
  useEffect(() => {
    let progress = 0;

    while (progress < allPoints.length) {
      const point = allPoints[progress];

      const passed = blocks.some((block, index) => {
        const distance = block.position.distanceTo(point);
        return distance <= 20 && tippeds[index];
      });

      if (!passed) {
        break;
      }

      progress++;
    }

    setProgress(progress);
  }, [allPoints, blocks, tippeds]);

  return progress;
}
