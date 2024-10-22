import { Line } from "@react-three/drei";
import { useContext, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { useBuilt } from "../../dominos/useBuilt";
import { PlayContext } from "../PlayContext";
import { buttonSize } from "./Ground";
import { endPosition, startPosition } from "./start";

export function Path() {
  const allPoints = useMemo(() => {
    const points: Vector3[] = [];

    const lapCount = 3;
    const lapStepCount = 32;
    const totalStepCount = lapCount * lapStepCount;
    for (let i = totalStepCount; i >= 0; i--) {
      const angle = (i / lapStepCount) * Math.PI * 2 + Math.PI / 2;

      const distance =
        (i / totalStepCount) * (endPosition[2] - startPosition[2]) +
        startPosition[2];

      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;

      if (
        Math.sqrt(
          Math.pow(x - startPosition[0], 2) + Math.pow(z - startPosition[2], 2)
        ) <= buttonSize ||
        Math.sqrt(
          Math.pow(x - endPosition[0], 2) + Math.pow(z - endPosition[2], 2)
        ) <= buttonSize
      ) {
        continue;
      }

      points.push(new Vector3(x, 0, z));
    }

    return points.reverse();
  }, []);

  const [progress, setProgress] = useState(0);
  const passedPoints = useMemo(
    () => allPoints.slice(0, progress),
    [allPoints, progress]
  );

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

  const setSlotState = useSetSlotState();
  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (progress >= allPoints.length) {
        setSlotState(ItemState.Success);
      } else {
        if (tippeds) {
          const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [allPoints.length, item.state, progress, setSlotState, tippeds]);

  const built = useBuilt();

  return (
    <>
      <Line
        points={allPoints}
        position={[0, 0.5, 0]}
        color={0xf7fff7}
        dashed={true}
        dashScale={0.2}
        lineWidth={4}
      />

      {passedPoints.length > 1 && (
        <Line
          points={passedPoints}
          position={[0, 0.6, 0]}
          color={built ? 0xef7a85 : 0xffe66d}
          dashed={true}
          dashScale={0.2}
          lineWidth={4}
        />
      )}
    </>
  );
}
